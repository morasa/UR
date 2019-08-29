import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { ListviewComponent } from './listview/listview.component';
import { FootorComponent } from './footor/footor.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
const routes: Routes = [{
  path: 'recipe',
  component: RecipeComponent,
  children: [{
              path: '',
              outlet: 'footer',
              component:FootorComponent    
            },
            {
              path: '',
              outlet: 'middlecontent',
              component:ListviewComponent
            },
            {
              path: '',
              outlet: 'header',
              component:ClientHeaderComponent
            },
            {
              path: 'upload',
              outlet: 'middlecontent',
              component:UploadComponent
            },
            {
              path: 'profile',
              outlet: 'middlecontent',
              component:ProfileComponent
            },
            {
              path: 'detail',
              outlet: 'middlecontent',
              component:DetailViewComponent
            },
            // {
            //   path: 'roles',
            //   outlet: 'display',
            //   component: RolesComponent    
            // },
            // {
            //   path: 'users',
            //   outlet: 'display',
            //   component: UsersComponent    
            // },
            // {
            //   path: 'menuacess',
            //   outlet: 'display',
            //   component: MenuAccessComponent    
            // }
          ]
        }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
