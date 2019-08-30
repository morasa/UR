import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { first } from 'rxjs/operators';
import { config } from '../../admin/config';
@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  recipiesList = [];
  serverUrl = config.apiUrl;
  constructor(private listService:ListService) { }

  ngOnInit() {
    this.loadAllRecipies();
  }

  loadAllRecipies(){
    this.listService.getUserRecipes().pipe(first()).subscribe(List => {
                                                this.recipiesList = (List as any).recipieList;
                                                console.log(this.recipiesList);
                                              });
  }

}
