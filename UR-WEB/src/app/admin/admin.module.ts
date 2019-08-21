import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MenusComponent } from './menus/menus.component';

@NgModule({
  declarations: [MenusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    AdminRoutingModule
  ]
})
export class AdminModule { }
