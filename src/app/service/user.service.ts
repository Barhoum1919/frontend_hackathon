import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient , private router:Router) { }

  login(loginData: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8001/user/logIn?email=${loginData.email}&password=${loginData.password}`, null).pipe(
      tap((response:any) => {
        this.isLoggedInSubject.next(true);
        localStorage.setItem('token', response.token); 
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('isLoggedOut','false');
        this.router.navigate(['/dashboard'])
        
      }), 
      catchError(() => {
       
      
        return of(false); 
      })
    );
  }
  
  

  signup(user:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8001/user/signUp',user);
  }


  getUser(token:string){
    return this.http.get(`http://127.0.0.1:8001/user/getUser?token=${token}`)
  }
 
 logout(){
  this.isLoggedInSubject.next(false);
  localStorage.setItem('isLoggedIn','false');
  localStorage.setItem('isLoggedOut','true');
  localStorage.removeItem('token');
 }
}
