import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Itinerary, ItineraryList } from '../interfaces/share-interface';
import { ApiService } from '../api-service/api-service.service';
import { Route, Router } from '@angular/router';
import { ItinerariesAllCardService } from '../share-data/itineraries-all-card.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-app-hero',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './app-hero.component.html',
  styleUrl: './app-hero.component.css',
})
export class AppHeroComponent implements OnInit{

  imageUrl: Observable<string> | undefined;

   apiServerUrl = environment.apiBaseUrl;

  title = 'card-sliding';
  itineraryList$: Observable<ItineraryList[]> = this.itineraryService.itinerariesCardData$;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('cards') cards!: ElementRef;
  currentIndex: number = 0;
  cardWidth: number = 0; // Initialize to 0
  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private itineraryService: ItinerariesAllCardService,private router:Router,
    private ngZone: NgZone
    ) {
    this.imageUrl = this.apiService.getHeroBackgroundImageUrl();
    this.itineraryList$ = this.getItineraries();//get data from api call and set data to observable!

  }
  imageBlob?: Blob;
  imageTest?: string;
  ngOnInit() {
    this.itineraryService.getAndSetItineraries();
  }
      
  createImageUrl(): void {
    if (this.imageBlob) {
      this.imageTest = URL.createObjectURL(this.imageBlob);
    }
  }
  ngAfterViewInit() {
    this.itineraryList$.subscribe({
      next: (value) => {
        this.calculateContainerWidth(value[0].itinerary);
        this.updateCardContainer();
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
    });
 
  }

  getItineraries(): Observable<ItineraryList[]> {
    return this.apiService.getAllItineraryLists();
  }

  calculateContainerWidth(itineraries: Itinerary[]) {
    const totalWidth = itineraries.reduce((acc, card) => {
      return acc + 300; // Change 300 to the actual width of your cards
    }, 0);

    this.container.nativeElement.style.width = `${totalWidth}px`;
    this.cardWidth = 300; // Change 300 to the actual width of your cards
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateCardContainer();
    }
  }

  next() {
    this.itineraryList$.subscribe(itinerariesList => {
      if (this.currentIndex < itinerariesList.length - 1) {
        this.currentIndex += 1;
        this.updateCardContainer();
      }
    });
  }

  updateCardContainer() {
    const cards = this.cards.nativeElement;
    const transformValue = -this.currentIndex * this.cardWidth;
    const transformStyle = `translateX(${transformValue}px)`;
    cards.style.transform = transformStyle;
  }
}