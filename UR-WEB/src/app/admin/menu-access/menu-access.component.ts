import { Component, OnInit } from '@angular/core';
import { MenuAccessService } from '../services/menu-access.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.css']
})
export class MenuAccessComponent implements OnInit {

  accessList = [];
  registerForm: FormGroup;
  submitted = false;
  message="";
  usersRoleList = [];
  menusList = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private menuAccessService:MenuAccessService) { }

  ngOnInit() {
    this.getUserRoles();
    this.getMenuslist();
    this.loadAllAccess();

    this.registerForm = this.formBuilder.group({
      menuCode: ['', Validators.required],
      roleCode: ['', Validators.required],
      'access_create':[''],
      'access_read':[''],
      'access_update':[''],
      'access_delete':['']          
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

   private loadAllAccess(){
     this.menuAccessService.getAllAccess().pipe(first()).subscribe(accessResp => { 
       this.accessList = (accessResp as any).MRA_List;
       console.log("Access LIst", this.accessList);
    });
   }
   
  private getUserRoles(){
    this.menuAccessService.getRoles().pipe(first()).subscribe(userRole => {
      this.usersRoleList = (userRole as any).rolseList;
    });
  }

  private getMenuslist(){
    this.menuAccessService.getMenus().pipe(first()).subscribe(menus => {
      this.menusList = (menus as any).menusList;
    });
  }

   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }
     this.menuAccessService.addAccess(this.registerForm.value)
         .pipe(first())
         .subscribe(
             data => {
                this.message= (data as any).message;
                close();
             },
             error => {
               console.log("Error data==>", error);
             });
   }
 
   close(){
     if(this.submitted){
       this.loadAllAccess();
       this.submitted=false;
     }
   }
   deleteRecord(id){
     console.log("id", id);
     this.menuAccessService.deleteAccess(id)
     .pipe(first())
     .subscribe(
         data => {
           console.log("Message::",(data as any).message);
           this.loadAllAccess();
         },
         error => {
           console.log("Error date==>", error);
         });
   }

}
