import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  registerForm: FormGroup;
  submitted = false;
  message="";
  usersRoleList = [];
  currentUserAction:any = {create: false, 
                           delete: false, 
                          read: false, 
                          update: false}
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService:UserService) { }

  ngOnInit() {
    this.getActionsList();
    this.getUserRoles();
    this.loadAllUsers();
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userCode: ['', Validators.required],
      roleCode: ['', Validators.required],
      email:['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  private loadAllUsers(){
    this.userService.getUsers().pipe(first()).subscribe(userResp => {
      this.users = userResp;
    });
  }

  private getUserRoles(){
    this.userService.getRoles().pipe(first()).subscribe(userRole => {
      this.usersRoleList = (userRole as any).rolseList; 
      console.log("URL",  this.usersRoleList);
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log("this.registerForm.value", this.registerForm.value);

    this.userService.addUser(this.registerForm.value)
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
      this.loadAllUsers();
      this.submitted=false;
    }
  }
  deleteUser(user_code){
    console.log("id", user_code);
    this.userService.deleteUser(user_code)
    .pipe(first())
    .subscribe(
        data => {
          console.log("Message::",(data as any).message);
          this.loadAllUsers();
        },
        error => {
          console.log("Error date==>", error);
        });
  }

  private getActionsList(){
    this.userService.getActions().pipe(first()).subscribe(userActions => {     
     
        this.currentUserAction = JSON.parse((userActions as any).roleCollection.filter(function(a:any){
                return (a.menu_code === "USERS");
        })[0].user_action);

        console.log("User ACTIONS-currentUserAction", this.currentUserAction);

    });
  }

}
