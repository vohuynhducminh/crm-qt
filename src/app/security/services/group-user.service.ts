import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupUser, GroupUserCM } from '../models/group-user';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class GroupUserService {

  constructor(private httpClient: HttpClient) { }

  getGroupUser(): Promise<GroupUser[]> {
    return this.httpClient.get<GroupUser[]>(
      `${environment.endPoint + environment.apiPaths.groupUser.get}`
    ).toPromise();
  }

  getGroupUserByGroup(group: Group): Promise<GroupUser[]> {
    return this.httpClient.get<GroupUser[]>(
      `${environment.endPoint + environment.apiPaths.groupUser.getByGroupId + group.Id}`
    ).toPromise();
  }

  getGroupUserByUser(user: User): Promise<GroupUser[]> {
    return this.httpClient.get<GroupUser[]>(
      `${environment.endPoint + environment.apiPaths.groupUser.getByUserId + user.Id}`
    ).toPromise();
  }

  createGroupUser(groupUserList: GroupUserCM[]): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.groupUser.post}`,
      groupUserList
    ).toPromise();
  }

  updateGroupUser(groupUser: GroupUser): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.groupUser.put}`,
      groupUser
    ).toPromise();
  }

  deleteGroupUser(groupUser: GroupUser): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.groupUser.delete + groupUser.Id}`
    ).toPromise();
  }

}
