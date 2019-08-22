import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { AdminComponent } from './admin/admin.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
      {
        path: 'admin',
        component: AdminComponent,
        children: [{
                    path: '',
                    outlet: 'display',
                    component: MenusComponent    
                  },
                  {
                    path: '',
                    outlet: 'sidemenu',
                    component: SideMenuComponent
                  },
                  {
                    path: '',
                    outlet: 'header',
                    component: HeaderComponent
                  }
                ]
      }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
