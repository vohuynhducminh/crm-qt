import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasicService<V, C, U> {

  constructor(private http: HttpClient) { }

  useGetAll = (name: 'common_telecom_service' | 'telecom_service' | 'telecom_service_parameter'): Promise<V[]> => {
    return this.http.get<V[]>(`${environment.endPoint}${environment.apiPaths[name].post}`).toPromise();
  }
  useGetById = (name: 'common_telecom_service' | 'telecom_service' | 'telecom_service_parameter', id: string): Promise<V> => {
    return this.http.get<V>(`${environment.endPoint}${environment.apiPaths[name].get}${id}`).toPromise();
  }
  useCreate = (name: 'common_telecom_service' | 'telecom_service' | 'telecom_service_parameter', data: C): Promise<any> => {
    return this.http.post<any>(`${environment.endPoint}${environment.apiPaths[name].post}`, data).toPromise();
  }
  useUpdate = (name: 'common_telecom_service' | 'telecom_service' | 'telecom_service_parameter', data: U): Promise<any> => {
    return this.http.put<any>(`${environment.endPoint}${environment.apiPaths[name].post}`, data).toPromise();
  }
  useDelete = (name: 'common_telecom_service' | 'telecom_service' | 'telecom_service_parameter', id: string): Promise<any> => {
    return this.http.delete<V>(`${environment.endPoint}${environment.apiPaths[name].get}${id}`).toPromise();
  }

}
