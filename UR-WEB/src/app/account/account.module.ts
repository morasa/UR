import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AccountRoutingModule } from './account-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';

import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccountRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AccountModule { }
