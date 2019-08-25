import { Component, OnInit } from '@angular/core';
import { SideMenusService } from '../../admin/services/side-menus.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  userMenuList = [];
  constructor(private sideMenusService:SideMenusService) { }

  ngOnInit() {
    this.getMenuList();
  }

  getMenuList(){
    this.sideMenusService.getUserMenuList().pipe(first()).subscribe(roleMenu => {
      console.log("show list", roleMenu);
      this.userMenuList = (roleMenu as any).roleCollection; 
      console.log("URL",  this.userMenuList);
    });
  }


}
