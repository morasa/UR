import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private router: Router,public http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email:string,password:string){   
    const url = 'http://127.0.0.1:5000/login';      

    return this.http.post<any>(url,{ email, password }).pipe(map(userObj => {         
           
           let userModel = {
                              username: userObj.user.user_name,
                              usercode: userObj.user.user_code,                             
                              email: userObj.user.email,
                              token: userObj.token
                          };

            localStorage.setItem('currentUser', JSON.stringify(userModel));

            this.currentUserSubject.next(userModel);
            return userObj;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  } 

}