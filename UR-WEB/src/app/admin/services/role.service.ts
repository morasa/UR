import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../account/service/login.service';
import { Role } from '../models';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,private loginService:LoginService) { }

  getAll() {
    return this.http.get<Role[]>(`${config.apiUrl}/api/roles/list`);
  }

  add(role){
    let currentUser = this.loginService.currentUserValue;

    const roleObject = {
      role_name: role.roleName,
      role_code: role.roleCode,
      created_by: currentUser.username 
    };

    return this.http.post(`${config.apiUrl}/api/roles/create`, roleObject);
  }//EOF ADD

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/api/roles/delete/${id}`);
  }//EOF Delet

}
