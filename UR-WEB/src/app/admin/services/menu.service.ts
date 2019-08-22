import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models';
import { config } from '../config';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Menu[]>(`${config.apiUrl}/api/menus/list`);
  }

  add(menu) {
    const menuObject = {
      menu_name: menu.menuName,
      menu_url: menu.menuUrl,
      menu_code: menu.menuCode,
      menu_description:menu.menuDescription,
      created_by:"user01"
    }
    return this.http.post(`${config.apiUrl}/api/menus/create`, menuObject);
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/api/menus/delete/${id}`);
  }


}
