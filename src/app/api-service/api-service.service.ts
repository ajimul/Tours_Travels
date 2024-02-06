import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { MyCard } from '../app.interface/share-interface';
import { Observable, of } from 'rxjs';
import { TokenService } from '../token-service/token.service';
import { environment } from '../../environments/environment';
import { Itinerary, ItineraryList, ItineraryListSimpleDTO } from '../interfaces/share-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  h: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private token:TokenService) {}
    // const options = { headers: this.token.getContentHeadersWithAuthorization() };

  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  loginn(loginForm: any) {
    return this.http.post(
      `${this.apiServerUrl}v1/auth/authenticate`,
      loginForm
    );
  }
  logout(): Observable<string> {
    const logoutUrl = `${this.apiServerUrl}v1/auth/logout`;
    return this.http.post<string>(logoutUrl, null);
  }
  //----------------------------------------------ItinerariesList Service------------------------------------------------------>

   getAllItineraryLists(): Observable<ItineraryList[]> {
    return this.http.get<ItineraryList[]>(`${this.apiServerUrl}itinerary-lists/all`);
  }

  getAllItineraryListsInGroup(): Observable<ItineraryListSimpleDTO[]> {
    return this.http.get<ItineraryListSimpleDTO[]>(
      `${this.apiServerUrl}itinerary-lists/group`
    );
  }

  getItineraryListById(id: number): Observable<ItineraryList> {
    return this.http.get<ItineraryList>(
      `${this.apiServerUrl}itinerary-lists/by-id/${id}`
    );
  }

  getItineraryListByName(name: string): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(
      `${this.apiServerUrl}itinerary-lists/by-name/${name}`
    );
  }

  createItineraryList(itineraryList: ItineraryList): Observable<ItineraryList> {
    const options = { headers: this.token.getContentHeadersWithAuthorization() };
    return this.http.post<ItineraryList>(
      `${this.apiServerUrl}itinerary-lists/create`,itineraryList,options);
  }

  createItineraryGroup(
    itineraryDTO: ItineraryListSimpleDTO
  ): Observable<ItineraryList> {
    const options = { headers: this.token.getContentHeadersWithAuthorization() };
    return this.http.post<ItineraryList>(
      `${this.apiServerUrl}itinerary-lists/create-group`,
      itineraryDTO,
      options
    );
  }

  deleteItineraryList(id: number): Observable<void> {
    const options = { headers: this.token.getContentHeadersWithAuthorization() };
    return this.http.delete<void>(
      `${this.apiServerUrl}itinerary-lists/delete/${id}`,
      options
    );
  }

  //----------------------------------------------Itinerary Service------------------------------------------------------>

  getAllItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(`${this.apiServerUrl}itineraries/all`);
  }

  createItinerary(
    itinerary: Omit<Itinerary, 'itineraryId'>,
    file: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('itinerary', JSON.stringify(itinerary));
    formData.append('file', file);
    const options = { headers: this.token.getContentLessHeadersWithAuthorization() };
    return this.http.post<any>(
      `${this.apiServerUrl}itineraries/create`,
      formData,
      options
    );
  }

  deleteItinerary(id: number, img: any): Observable<any> {
    const options = { headers: this.token.getContentHeadersWithAuthorization() };
    return this.http.delete<any>(
      `${this.apiServerUrl}itineraries/delete/${id}/${img}`,options);
  }

  //----------------------------------------------Hero Background Image Service------------------------------------------------------>

  getHeroBackgroundImageUrl(): Observable<string> {
    return of('/assets/Image/winter.jpg');
  }

  //----------------------------------------------Image Service------------------------------------------------------>

  getImage(imageName: string): Observable<Blob> {
    
    return this.http.get(`${this.apiServerUrl}image/${imageName}`, { responseType: 'blob' });
  }

}
