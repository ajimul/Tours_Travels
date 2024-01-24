import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api-service/api-service.service';
import { Itinerary } from '../interfaces/share-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItinerariesAllCardService } from '../share-data/itineraries-all-card.service';

@Component({
  selector: 'app-app-itinerary-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-itinerary-list.component.html',
  styleUrl: './app-itinerary-list.component.css'
})
export class AppItineraryListComponent {
  cardListTitle:string='All Category'
  basePath: string = "assets/Image/";
  private itinerariesSubject: BehaviorSubject<Itinerary[]> = new BehaviorSubject<Itinerary[]>([]);
  itineraries$: Observable<Itinerary[]> = this.itineraryService.itinerariesCardData$;  

  constructor(
    private apiService: ApiService,
    private itineraryService: ItinerariesAllCardService) {
    this.itineraries$ = this.getItineraries();//get data from api call and set data to observable!
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.apiService.getAllItineraries();
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