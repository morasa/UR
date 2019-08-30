import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { config } from '../../admin/config';
import { LoginService } from '../../account/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient,private loginService:LoginService) { }

  getUserRecipes() {
    let currentUser = this.loginService.currentUserValue;
    const code = currentUser.usercode;
    return this.http.get<any[]>(`${config.apiUrl}/api/recipe/list/${code}`);
  }
}
