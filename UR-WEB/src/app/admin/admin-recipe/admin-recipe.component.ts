import { Component, OnInit } from '@angular/core';
import { AdminRecipeService } from '../services/admin-recipe.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  recipiesList = [];
  constructor(private adminRecipeService:AdminRecipeService) { }

  ngOnInit() {
    this.loadAllRecipes();
  }

  loadAllRecipes(){
    this.adminRecipeService.getRecipesList().pipe(first()).subscribe(list => {
                                                this.recipiesList = (list as any).recipieList;
                                              });
  }

  publish(id){
    this.adminRecipeService.doPublish(id).pipe(first()).subscribe(list => {
      this.loadAllRecipes();
    });
  }

}
