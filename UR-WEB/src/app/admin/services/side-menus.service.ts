import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../account/service/login.service';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SideMenusService {

  constructor(private http: HttpClient,
    private loginService:LoginService) { }


  getUserMenuList(){
    let currentUser = this.loginService.currentUserValue;
     console.log("side Menu service currentUser", currentUser);
    return this.http.get(`${config.apiUrl}/api/access/list/${currentUser.role}`);
  }
}
