import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContractCooperationSub } from 'src/app/contract-cooperation/models';

@Injectable({
  providedIn: 'root',
})
export class ContractCooperationSubService {
  api = environment.apiPaths;
  endPoint = environment.endPoint;
  constructor(private http: HttpClient) { }

  getAll(): Promise<ContractCooperationSub[]> {
    return this.http.get<ContractCooperationSub[]>(
      `${this.endPoint}${this.api.contract_cooperation_sub.main}`
    ).toPromise();
  }
  getById(id: string): Promise<ContractCooperationSub> {
    return this.http.get<ContractCooperationSub>(
      `${this.endPoint}${this.api.contract_cooperation_sub.main}/${id}`
    ).toPromise();
  }
  create(data: ContractCooperationSub): Promise<any> {
    return this.http.post<any>(
      `${this.endPoint}${this.api.contract_cooperation_sub.main}`, data
    ).toPromise();
  }
  update(data: ContractCooperationSub): Promise<any> {
    return this.http.put<any>(
      `${this.endPoint}${this.api.contract_cooperation_sub.main}`, data
    ).toPromise();
  }
  delete(id: string): Promise<any> {
    return this.http.delete<any>(
      `${this.endPoint}${this.api.contract_cooperation_sub.main}/${id}`
    ).toPromise();
  }
}
