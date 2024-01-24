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
import { Itinerary } from '../interfaces/share-interface';
import { ApiService } from '../api-service/api-service.service';
import { ItinerariesCardService } from '../share-data/itineraries-card.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-hero.component.html',
  styleUrl: './app-hero.component.css',
})
export class AppHeroComponent implements OnInit{

  imageUrl: Observable<string> | undefined;
  basePath: string = 'assets/Image/';
  title = 'card-sliding';
  itineraries$: Observable<Itinerary[]> = this.itineraryService.itinerariesCardData$;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('cards') cards!: ElementRef;
  currentIndex: number = 0;
  cardWidth: number = 0; // Initialize to 0
  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private itineraryService: ItinerariesCardService,private router:Router) {
    this.imageUrl = this.apiService.getHeroBackgroundImageUrl();
    this.itineraries$ = this.getItineraries();//get data from api call and set data to observable!
  }

  ngOnInit() {
    this.itineraryService.getAndSetItineraries();
  }

  ngAfterViewInit() {
    this.itineraries$.subscribe({
      next: (value) => {
        this.calculateContainerWidth(value);
        this.updateCardContainer();
        this.cdr.detectChanges();
      },
      error: (e) => console.error(e),
    });
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.apiService.getAllItineraries();
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
    this.itineraries$.subscribe(itineraries => {
      if (this.currentIndex < itineraries.length - 1) {
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
  navigation() {
    this.router.navigate(['/home/nav']);    }
}