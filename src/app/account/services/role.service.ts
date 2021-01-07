import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleCM, RoleUM, RoleVM } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private http: HttpClient) { }
  useGetAll = (): Promise<RoleVM[]> => {
    return this.http.get<RoleVM[]>(`${environment.endPoint}${environment.apiPaths.account_role.main}`).toPromise();
  }

  useGetById = (id: string): Promise<RoleVM> => {
    return this.http.get<RoleVM>(`${environment.endPoint}${environment.apiPaths.account_role.main}`).toPromise();
  }

  useCreate = (data: RoleCM): Promise<undefined> => {
    return this.http.post<undefined>(`${environment.endPoint}${environment.apiPaths.account_role.main}`, data).toPromise();
  }

  useUpdate = (data: RoleUM): Promise<undefined> => {
    return this.http.put<undefined>(`${environment.endPoint}${environment.apiPaths.account_role.main}`, data).toPromise();
  }

  useDelete = (id: string): Promise<undefined> => {
    return this.http.delete<undefined>(`${environment.endPoint}${environment.apiPaths.account_role.main}`).toPromise();
  }

}
