import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itinerary } from '../interfaces/share-interface';
import { ApiService } from '../api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ItinerariesAllCardService {
  private itinerariesCardDataSubject: BehaviorSubject<Itinerary[]> = new BehaviorSubject<Itinerary[]>([]);
  public itinerariesCardData$: Observable<Itinerary[]> = this.itinerariesCardDataSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) { }

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
    this.itinerariesCardDataSubject.next(itineraries);
  }
}