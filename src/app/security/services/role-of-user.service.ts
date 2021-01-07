import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleOfUser, RoleOfUserCM } from '../models/role-of-user';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleOfUserService {

  constructor(private httpClient: HttpClient) { }

  getRoleOfUser(user: User): Promise<RoleOfUser[]> {
    return this.httpClient.get<RoleOfUser[]>(
      `${environment.endPoint + environment.apiPaths.roleOfUser.getByUserId + user.Id}`
    ).toPromise();
  }

  createRoleOfUser(roleOfUserCM: RoleOfUserCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.roleOfUser.post}`,
      roleOfUserCM
    ).toPromise();
  }

  updateRoleOfUser(roleOfUser: RoleOfUser): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.roleOfUser.put}`,
      roleOfUser
    ).toPromise();
  }

  deleteRoleOfUser(roleOfUser: RoleOfUser): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.roleOfUser.delete + roleOfUser.Id}`
    ).toPromise();
  }

}
