import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api-service/api-service.service';
import { Itinerary, ItineraryList } from '../interfaces/share-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItinerariesAllCardService } from '../share-data/itineraries-all-card.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-app-itinerary-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-itinerary-list.component.html',
  styleUrl: './app-itinerary-list.component.css'
})
export class AppItineraryListComponent {
  apiServerUrl = environment.apiBaseUrl;

  cardListTitle:string='All Category'
  private itinerariesSubject: BehaviorSubject<Itinerary[]> = new BehaviorSubject<Itinerary[]>([]);
  itineraryList$: Observable<ItineraryList[]> = this.itineraryService.itinerariesCardData$;  
card: any;

  constructor(
    private apiService: ApiService,
    private itineraryService: ItinerariesAllCardService) {
    this.itineraryList$ = this.getItineraries();//get data from api call and set data to observable!
  }

  getItineraries(): Observable<ItineraryList[]> {
    return this.apiService.getAllItineraryLists();
  }

  getAndSetItineraries(): void {
    this.apiService.getAllItineraries().subscribe(
      (itineraries: Itinerary[]) => {
        this.setItineraries(itineraries);
      },
      (error) => {
        console.error('Error fetching itineraries', error);
      }
    );
  }

  private setItineraries(itineraries: Itinerary[]): void {
    this.itinerariesSubject.next(itineraries);
  }

  ngOnInit() {
    this.itineraryService.getAndSetItineraries();
  }
}