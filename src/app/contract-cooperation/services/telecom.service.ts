import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Telecom } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TelecomService {
  api = environment.apiPaths;
  endPoint = environment.endPoint;
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Array<Telecom>> {
    return this.httpClient
      .get<Array<Telecom>>(`${this.endPoint}${this.api.telecom_service.get}?type=1`)
      .toPromise();
  }
  getById(id: String): Promise<Telecom> {
    return this.httpClient
      .get<Telecom>(`${this.endPoint}${this.api.telecom_service.get}${id}`)
      .toPromise();
  }
  getParameterById(id: String): Promise<string[]> {
    return this.httpClient
      .get<string[]>(`${this.endPoint}${this.api.telecom_service.get}${id}/Parameter`)
      .toPromise();
  }

}
