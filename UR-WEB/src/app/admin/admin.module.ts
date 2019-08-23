import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountRoutingModule } from '../account/account-routing.module';
import { MenusComponent } from './menus/menus.component';
import { AdminComponent } from './admin/admin.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [MenusComponent, AdminComponent, SideMenuComponent, HeaderComponent, RolesComponent, UsersComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule ,
    AdminRoutingModule
  ]
})
export class AdminModule { }
