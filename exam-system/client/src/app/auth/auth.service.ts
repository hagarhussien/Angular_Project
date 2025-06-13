import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { identifier: string, password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, user);
  }

  resetPassword(payload: { token: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/reset-password`, payload);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/me`);
  }
}