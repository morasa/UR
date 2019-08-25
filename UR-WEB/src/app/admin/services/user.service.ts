import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../account/service/login.service';
import { RoleService} from './role.service';
import { User } from '../models';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private loginService:LoginService,
              private roleService:RoleService) { }

  getUsers(){
    return this.http.get<User[]>(`${config.apiUrl}/api/users/list`);
  }

  getRoles(){
    return this.roleService.getAll();
  }

  addUser(userobj){
    let currentUser = this.loginService.currentUserValue;

    const userModel = {
      user_name: userobj.userName,
      email: userobj.email,
      role_code: userobj.roleCode,
      user_code:userobj.userCode,
      created_by:currentUser.username
    };

    return this.http.post(`${config.apiUrl}/api/users/create`, userModel);
  }

  deleteUser(user_code: string) {
    return this.http.delete(`${config.apiUrl}/api/users/${user_code}`);
  }//EOF Delet

}
