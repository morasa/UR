import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { LoginService } from '../../account/service/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser:string;
  constructor(private headerService: HeaderService,private loginService:LoginService) {
    this.currentUser = this.loginService.currentUserValue.username;
   }

  ngOnInit() {
  }

  doLogOut(){
    this.headerService.logout();
  }

}
