import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { config } from '../../admin/config';
import { LoginService } from '../../account/service/login.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,private loginService:LoginService) { }

  getAll() {
    return this.http.get<any[]>(`${config.apiUrl}/api/menus/list`);
  }

  add(recipeObj, file) {
    const options = {} as any
    let currentUser = this.loginService.currentUserValue;

    let resonseKeyMap = {
        "recipeName":"recipe_name",
        "recipeDescription":"recipe_description",
        "recipeWeight":"recipe_no_of_persons",
        "recipePersons":"recipe_kilo_grams"
    }

    const formData = new FormData();

    Object.keys(recipeObj).forEach(key => {
      if(key == "ing_primary_ingredients" || key == "ing_secondary_ingredients"){
        formData.append(key, JSON.stringify(recipeObj[key]));
      }else{
        formData.append(resonseKeyMap[key], recipeObj[key]);
      }
    });

    formData.append('recipe_img', file);
    formData.append("created_by",currentUser.usercode);
    formData.append("is_published","no");

    return this.http.post(`${config.apiUrl}/api/upload/recipe`, formData, options);
  }

}
