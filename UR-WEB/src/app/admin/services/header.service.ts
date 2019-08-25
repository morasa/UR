import { Injectable } from '@angular/core';
import { LoginService } from '../../account/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private loginService:LoginService) { }

  logout(){
    this.loginService.logout();
  }
}
