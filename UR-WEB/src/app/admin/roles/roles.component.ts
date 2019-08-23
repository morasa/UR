import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles = [];
  registerForm: FormGroup;
  submitted = false;
  message="";

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private roleService:RoleService) { }

  ngOnInit() {
    this.loadAllRoles();
    this.registerForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      roleCode: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  private loadAllRoles(){
    this.roleService.getAll().pipe(first()).subscribe(roleList => this.roles = roleList);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.roleService.add(this.registerForm.value)
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
      this.loadAllRoles();
      this.submitted=false;
    }
  }
  deleteRecord(id){
    console.log("id", id);
    this.roleService.delete(id)
    .pipe(first())
    .subscribe(
        data => {
          console.log("Message::",(data as any).message);
          this.loadAllRoles();
        },
        error => {
          console.log("Error date==>", error);
        });
  }

}
