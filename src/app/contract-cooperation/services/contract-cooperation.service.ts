import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContractCooperation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContractCooperationService {
  api = environment.apiPaths;
  endPoint = environment.endPoint;
  constructor(private http: HttpClient) { }

  getAll(): Promise<ContractCooperation[]> {
    return this.http.get<ContractCooperation[]>(
      `${this.endPoint}${this.api.contract_cooperation.main}`
    ).toPromise();
  }
  getById(id: string): Promise<ContractCooperation> {
    return this.http.get<ContractCooperation>(
      `${this.endPoint}${this.api.contract_cooperation.main}/${id}`
    ).toPromise();
  }
  create(data: ContractCooperation): Promise<any> {
    return this.http.post<any>(
      `${this.endPoint}${this.api.contract_cooperation.main}`, data
    ).toPromise();
  }
  update(data: ContractCooperation): Promise<any> {
    return this.http.put<any>(
      `${this.endPoint}${this.api.contract_cooperation.main}`, data
    ).toPromise();
  }
}
