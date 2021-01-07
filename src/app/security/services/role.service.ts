import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role, RoleCM } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRole(): Promise<Role[]> {
    return this.httpClient.get<Role[]>(
      `${environment.endPoint + environment.apiPaths.role.get}`
    ).toPromise();
  }

  createRole(roleCM: RoleCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.role.post}`,
      roleCM
    ).toPromise();
  }

  updateRole(role: { Id: string, Name: string, Father: string }): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.role.put}`,
      {Id: role.Id, Name: role.Father + '---' + role.Name}
    ).toPromise();
  }

  deleteRole(role: Role): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.role.delete + role.Id}`
    ).toPromise();
  }

}
