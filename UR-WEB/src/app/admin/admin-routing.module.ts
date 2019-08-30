import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { AdminComponent } from './admin/admin.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MenuAccessComponent } from './menu-access/menu-access.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';

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
                  },
                  {
                    path: 'roles',
                    outlet: 'display',
                    component: RolesComponent    
                  },
                  {
                    path: 'users',
                    outlet: 'display',
                    component: UsersComponent    
                  },
                  {
                    path: 'menuacess',
                    outlet: 'display',
                    component: MenuAccessComponent    
                  },
                  {
                    path: 'adminRecipe',
                    outlet: 'display',
                    component: AdminRecipeComponent    
                  }
                ]
      }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
