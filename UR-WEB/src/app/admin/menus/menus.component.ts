import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  menus = [];
  registerForm: FormGroup;
  submitted = false;
  message="";
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private menuService:MenuService) { }

  ngOnInit() {
      this.loadAllMenus();
      this.registerForm = this.formBuilder.group({
        menuName: ['', Validators.required],
        menuUrl: ['', Validators.required],
        menuCode: ['', Validators.required],
        menuDescription: ['', [Validators.required, Validators.minLength(15)]]
     });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  private loadAllMenus(){
    this.menuService.getAll()
        .pipe(first())
        .subscribe(list => {console.log(list); this.menus = list});
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log("registerForm", this.registerForm);
    if (this.registerForm.invalid) {
        return;
    }

    this.menuService.add(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
               this.message= (data as any).message;
            },
            error => {
              console.log("Success date==>", error);
            });
  }

  close(){
    console.log("close modal");
    if(this.submitted){
      this.loadAllMenus();
    }
  }

  deleteRecord(id){
    console.log("id", id);
    this.menuService.delete(id)
    .pipe(first())
    .subscribe(
        data => {
          console.log("Message::",(data as any).message);
          this.loadAllMenus();
        },
        error => {
          console.log("Success date==>", error);
        });
  }



}
