import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountVM, AccountCM, AccountUM } from 'src/app/account/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) { }
  useGetAll = (roleName?: string): Promise<AccountVM[]> => {
    return this.http.get<AccountVM[]>(`${environment.endPoint}${environment.apiPaths.account.main}${roleName ? '?RoleName=' + roleName : ''}`).toPromise();
  }

  useGetById = (id: string): Promise<AccountVM> => {
    return this.http.get<AccountVM>(`${environment.endPoint}${environment.apiPaths.account.main}`).toPromise();
  }

  useCreate = (data: AccountCM): Promise<undefined> => {
    return this.http.post<undefined>(`${environment.endPoint}${environment.apiPaths.account.main}`, data).toPromise();
  }

  usePostRole = (data: AccountUM): Promise<undefined> => {
    return this.http.post<undefined>(`${environment.endPoint}${environment.apiPaths.account.main}/Roles`, data).toPromise();
  }

  useDelete = (id: string): Promise<undefined> => {
    return this.http.delete<undefined>(`${environment.endPoint}${environment.apiPaths.account.main}`).toPromise();
  }

}
