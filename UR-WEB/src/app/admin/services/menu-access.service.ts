import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../account/service/login.service';
import { RoleService } from './role.service';
import { MenuService } from './menu.service';
import { Access } from '../models';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MenuAccessService {

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private roleService: RoleService,
    private menuService:MenuService) { }

  getAllAccess() {
    return this.http.get<Access[]>(`${config.apiUrl}/api/access/list`);
  }

  getRoles() {
    return this.roleService.getAll();
  }

  getMenus(){
    return this.menuService.getAll();
  }

  addAccess(accessobj) {
 let anctionlist = {
                      'create':(accessobj.access_create)?true:false,
                      'delete':(accessobj.access_delete)?true:false,
                      'read':(accessobj.access_read)?true:false,
                      'update':(accessobj.access_update)?true:false
                  }
        ;
    let currentUser = this.loginService.currentUserValue;

    console.log("Actions List", JSON.stringify(anctionlist));
    const accessModel = {
      menu_code: accessobj.menuCode,
      role_code: accessobj.roleCode,
      user_action: JSON.stringify(anctionlist),
      created_by: currentUser.username
    };

    return this.http.post(`${config.apiUrl}/api/access/create`, accessModel);
  }

  deleteAccess(access_code: string) {
    return this.http.delete(`${config.apiUrl}/api/access/delete/${access_code}`);
  }//EOF Delet
}
