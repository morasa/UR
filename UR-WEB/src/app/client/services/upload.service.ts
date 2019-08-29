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

  add(recipe) {
    let currentUser = this.loginService.currentUserValue;
    /*let recipeObj = {
      "recipe_name": recipe.recipeName,
      "recipe_description": recipe.recipeDescription,
      "recipe_no_of_persons": recipe.recipePersons,
      "recipe_kilo_grams": recipe.recipeWeight,
      "recipe_image": recipe.recipefile,
      "primary_ingredients": [
        {
          "ing_name": "chillis",
          "ing_qty": 4,
          "ing_unit": "unit"
        },
        {
          "ing_name": "chillis",
          "ing_qty": 4,
          "ing_unit": "unit"
        }
      ],
      "secondary_ingredients": [
        {
          "ing_name": "chillis",
          "ing_qty": 4,
          "ing_unit": "unit"
        },
        {
          "ing_name": "chillis",
          "ing_qty": 4,
          "ing_unit": "unit"
        }
      ]
    }*/
    recipe.append("created_by",currentUser.username);
    const options = {} as any
    return this.http.post(`${config.apiUrl}/api/upload/recipe`, recipe, options);
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/api/menus/delete/${id}`);
  }


}
