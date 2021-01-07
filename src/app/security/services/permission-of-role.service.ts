import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PermissionOfRole, PermissionOfRoleCM } from '../models/permission-of-role';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class PermissionOfRoleService {

  constructor(private httpClient: HttpClient) { }

  getPermissionOfRoleList(role: Role): Promise<PermissionOfRole[]> {
    return this.httpClient.get<PermissionOfRole[]>(
      `${environment.endPoint + environment.apiPaths.permissionOfRole.getByRoleId + role.Id}`
    ).toPromise();
  }

  createPermissionOfRole(permissionOfRoleCM: PermissionOfRoleCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.permissionOfRole.post}`,
      permissionOfRoleCM
    ).toPromise();
  }

  updatePermissionOfRole(permissionOfRole: PermissionOfRole): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.permissionOfRole.put}`,
      permissionOfRole
    ).toPromise();
  }

  deletePermissionOfRole(permissionOfRole: PermissionOfRole): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.permissionOfRole.delete + permissionOfRole.Id}`
    ).toPromise();
  }

}
