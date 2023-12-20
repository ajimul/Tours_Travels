import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
// import { MyCard } from '../app.interface/share-interface';
import { Observable } from 'rxjs';
import { MyCard } from '../interfaces/share-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiServerUrl = environment.apiBaseUrl;
  private uploadUrl = 'D:/Angular/e-commerce-admin-csr/src/assets/images';
  h: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private route: Router) {}

  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  loginn(loginForm: any) {
    // const options = {
    //   withCredentials: true
    // };

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
    const logoutUrl = `${this.apiServerUrl}v1/auth/logout`;
    return this.http.post<string>(logoutUrl, null);
  }

  async setMyCards(mycard: MyCard): Promise<MyCard | undefined> {
    try {
      const response = await this.http
        .post<MyCard>(`${this.apiServerUrl}mycards`, mycard)
        .toPromise();
      return response;
    } catch (error) {
      console.error('Error in From-MyCards:', error);
      throw error;
    }
  }
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiServerUrl}image/upload`, formData);
  }


  
  getMyCardsByClientRefId(clientRefId: number): Observable<MyCard[]> {
    return this.http.get<MyCard[]>(`${this.apiServerUrl}mycards/byClientRefId/${1}`);
  }
}
