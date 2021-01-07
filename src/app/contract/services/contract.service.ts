import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  selectedContract: any;

  constructor(private httpClient: HttpClient) { }

  getContract(): Promise<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.endPoint}${environment.apiPaths.contract.get}`
    ).toPromise();
  }

  getContractById(id: string): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.contract.get}${id}`
    ).toPromise();
  }
  getAppendixByContractId(id: string): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.contract.get}${id}${environment.apiPaths.contract.annex}`
    ).toPromise();
  }
}
