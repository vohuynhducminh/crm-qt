import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserCM } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Promise<User[]> {
    return this.httpClient.get<User[]>(
      `${environment.endPoint + environment.apiPaths.user.get}`
    ).toPromise();
  }

  createUser(userCM: UserCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.user.post}`,
      userCM
    ).toPromise();
  }

  updateUser(user: User): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.user.put}`,
      user
    ).toPromise();
  }

  deleteUser(user: User): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.user.delete + user.Id}`
    ).toPromise();
  }

}
