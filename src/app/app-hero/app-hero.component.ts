import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryList } from '../interfaces/share-interface';
import { ApiService } from '../api-service/api-service.service';
import { ItinerariesAllCardService } from '../share-data/itineraries-all-card.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-hero.component.html',
  styleUrl: './app-hero.component.css',
})
export class AppHeroComponent implements OnInit {
  imageUrl: Observable<string> | undefined;
  apiServerUrl = environment.apiBaseUrl;
  title = 'card-sliding';
  itineraryList$: Observable<ItineraryList[]> =
    this.itineraryService.itinerariesCardData$;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('cards') cards!: ElementRef;
  currentIndex = 0;
  cardWidth = 300; // Initialize to 0
  totalCard = 0; // Initialize to 0
  transformValue = 0;
  stopNavigation = 0;
  stopCardNavigation = 0;
  cardDisplay = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private itineraryService: ItinerariesAllCardService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.imageUrl = this.apiService.getHeroBackgroundImageUrl();
    this.itineraryList$ = this.getItineraries();
    this.itineraryService.getAndSetItineraries();
  }

  ngAfterViewInit(): void {
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
    const totalWidth = itineraries.length * this.cardWidth;
    this.totalCard = totalWidth;
    this.container.nativeElement.style.width = `${totalWidth}px`;
    if (this.totalCard >= this.container.nativeElement.clientWidth) {
      this.stopNavigation =
        this.totalCard - this.container.nativeElement.clientWidth;
    }
  }
  prev() {
    if (this.currentIndex > 0) {
      const containerWidth = this.container.nativeElement.clientWidth;

      if (containerWidth > 300 && containerWidth < 599) {
        this.cardDisplay = 2;
      } else if (containerWidth > 600 && containerWidth < 899) {
        this.cardDisplay = 3;
      } else if (containerWidth > 900 && containerWidth < 1199) {
        this.cardDisplay = 4;
      } else {
        this.cardDisplay = 4;
      }
      this.currentIndex -= 1;
      this.updateCardContainer();
    }
  }

  next() {
    this.itineraryList$.subscribe((itinerariesList) => {
      const containerWidth = this.container.nativeElement.clientWidth;

      if (containerWidth > 300 && containerWidth < 599) {
        this.cardDisplay = 2;
      } else if (containerWidth > 600 && containerWidth < 899) {
        this.cardDisplay = 3;
      } else if (containerWidth > 900 && containerWidth < 1199) {
        this.cardDisplay = 4;
      } else {
        this.cardDisplay = 4;
      }

      if (
        this.currentIndex <itinerariesList[0].itinerary.length - this.cardDisplay) {

        // console.log('this.cardDisplay: '+this.cardDisplay)
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
