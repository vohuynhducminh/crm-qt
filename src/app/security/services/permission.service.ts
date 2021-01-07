import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission, PermissionCM } from '../models/permission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  constructor(private httpClient: HttpClient) { }

  getPermission(): Promise<Permission[]> {
    return this.httpClient.get<Permission[]>(
      `${environment.endPoint + environment.apiPaths.permission.get}`
    ).toPromise();
  }

  createPermission(permissionCM: PermissionCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.permission.post}`,
      permissionCM
    ).toPromise();
  }

  updatePermission(permission: Permission): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.permission.put}`,
      permission
    ).toPromise();
  }

  deletePermission(permission: Permission): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.permission.delete + permission.Id}`
    ).toPromise();
  }

}
