import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleOfGroup, RoleOfGroupCM } from '../models/role-of-group';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class RoleOfGroupService {

  constructor(private httpClient: HttpClient) { }

  getRoleOfGroup(group: Group): Promise<RoleOfGroup[]> {
    return this.httpClient.get<RoleOfGroup[]>(
      `${environment.endPoint + environment.apiPaths.roleOfGroup.getByGroupId + group.Id}`
    ).toPromise();
  }

  createRoleOfGroup(roleOfGroupCM: RoleOfGroupCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.roleOfGroup.post}`,
      roleOfGroupCM
    ).toPromise();
  }

  updateRoleOfGroup(roleOfGroup: RoleOfGroup): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.roleOfGroup.put}`,
      roleOfGroup
    ).toPromise();
  }

  deleteRoleOfGroup(roleOfGroup: RoleOfGroup): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.roleOfGroup.delete + roleOfGroup.Id}`
    ).toPromise();
  }

}
