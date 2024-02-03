import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItineraryList } from '../interfaces/share-interface';
import { ApiService } from '../api-service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ItinerariesAllCardService {
  private itinerariesCardDataSubject: BehaviorSubject<ItineraryList[]> = new BehaviorSubject<ItineraryList[]>([]);
  public itinerariesCardData$: Observable<ItineraryList[]> = this.itinerariesCardDataSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getAndSetItineraries(): void {
    this.apiService.getAllItineraryLists().subscribe(
      (itineraries: ItineraryList[]) => {
        this.setItineraries(itineraries);
      },
      (error) => {
        console.error('Error fetching itineraries', error);
      }
    );
  }

  private setItineraries(itineraries: ItineraryList[]): void {
    this.itinerariesCardDataSubject.next(itineraries);
  }
}