import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments';

interface LoginResponse {
  token: string;
  userExist: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly AUTH_STORAGE_KEY = 'auth_token';
  private readonly LOGIN_STATUS_KEY = 'login_status';
  private readonly API_URL = environment.apiUrl;
  
  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize with false, then check storage if in browser
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();

    // Check login status only if in browser
    if (isPlatformBrowser(this.platformId)) {
      const storedLoginStatus = localStorage.getItem(this.LOGIN_STATUS_KEY);
      if (storedLoginStatus) {
        this.isLoggedInSubject.next(storedLoginStatus === 'true');
      }
    }
  }

  login(loginData: LoginData): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<LoginResponse>(`${this.API_URL}/user/login`, loginData, { headers }).pipe(
      tap((response: LoginResponse) => {
        if (response.token && isPlatformBrowser(this.platformId)) {
          this.setAuthToken(response.token);
          this.isLoggedInSubject.next(true);
          this.setLoginStatus(true);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of({ token: '', userExist: false });
      })
    );
  }

  signup(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.API_URL}/user/signup`, user, { headers });
  }

  getUser(): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.API_URL}/user/getUser`, { headers });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedInSubject.next(false);
      this.setLoginStatus(false);
      this.removeAuthToken();
      this.router.navigate(['/login']);
    }
  }

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.AUTH_STORAGE_KEY);
    }
    return null;
  }

  private setAuthToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.AUTH_STORAGE_KEY, token);
    }
  }

  private removeAuthToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    }
  }

  private setLoginStatus(status: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.LOGIN_STATUS_KEY, status.toString());
    }
  }
}