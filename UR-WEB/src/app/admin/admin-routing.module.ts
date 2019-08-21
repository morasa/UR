import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'menus',
    component: MenusComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
