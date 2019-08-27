import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [{
  path: 'upload',
  component: UploadComponent,
  /*children: [{
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
            }
          ]*/
        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
