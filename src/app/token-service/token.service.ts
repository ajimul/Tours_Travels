import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService{
  constructor() {}

  getHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json', // Adjust Content-Type as needed
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
  getCustomHeadersWithAuthorization(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'file', //use for multimedia beacuse spring not support other type
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  clearAccessToken(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}