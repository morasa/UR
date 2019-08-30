import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../account/service/login.service';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminRecipeService {

  constructor(private http: HttpClient,
              private loginService:LoginService) { }

  getRecipesList(){
    return this.http.get<any[]>(`${config.apiUrl}/api/upload/recipe`);
  }

  doPublish(id){

    const recipeobj = {
      _id: id
    };

    return this.http.patch(`${config.apiUrl}/api/publish/recipe`, recipeobj);
  }

}
