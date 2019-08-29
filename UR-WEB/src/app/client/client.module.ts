import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectDirective } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { ListviewComponent } from './listview/listview.component';
import { UploadComponent } from './upload/upload.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FootorComponent } from './footor/footor.component';

@NgModule({
  declarations: [FileSelectDirective,ListviewComponent, UploadComponent, DetailViewComponent, ClientHeaderComponent, ProfileComponent, RecipeComponent, FootorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
