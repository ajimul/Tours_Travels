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
import { Itinerary } from '../interfaces/share-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  h: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private token:TokenService) {}
    // const options = { headers: this.token.getHeadersWithAuthorization() };

  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  loginn(loginForm: any) {

    const token = localStorage.getItem('access_token');
    const _headers = new HttpHeaders({
      'Content-Type': 'file',
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(
      `${this.apiServerUrl}v1/auth/authenticate`,
      loginForm
    );
  }
  logout(): Observable<string> {
    const options = { headers: this.token.getHeadersWithAuthorization() };
    const logoutUrl = `${this.apiServerUrl}v1/auth/logout`;
    return this.http.post<string>(logoutUrl,options);
  }
  getAllItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(`${this.apiServerUrl}itineraries`);
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiServerUrl}image/upload`, formData);
  }
  getHeroBackgroundImageUrl(): Observable<string> {
    return of('/assets/Image/winter.jpg');
  }
}
