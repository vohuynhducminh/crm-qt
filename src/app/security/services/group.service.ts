import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group, GroupCM } from '../models/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getGroup(): Promise<Group[]> {
    return this.httpClient.get<Group[]>(
      `${environment.endPoint + environment.apiPaths.group.get}`
    ).toPromise();
  }

  createGroup(groupCM: GroupCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.group.post}`,
      groupCM
    ).toPromise();
  }

  updateGroup(group: Group): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.group.put}`,
      group
    ).toPromise();
  }

  deleteGroup(group: Group): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.group.delete + group.Id}`
    ).toPromise();
  }

}
