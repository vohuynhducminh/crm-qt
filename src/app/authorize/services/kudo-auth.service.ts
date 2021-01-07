import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KudoAuthService {

  constructor(private httpClient: HttpClient) { }

  getUserInfo(): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.auth.information}`
    ).toPromise();
  }
}
