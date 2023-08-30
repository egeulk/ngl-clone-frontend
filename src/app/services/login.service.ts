import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.backendUrl; // Your Spring backend URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    console.log(localStorage.getItem('access_token'));
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }}
