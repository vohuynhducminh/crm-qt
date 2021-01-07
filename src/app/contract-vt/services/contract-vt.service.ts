import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContractVt, ContractVtAnnex } from 'src/app/contract-vt/models';

@Injectable({
  providedIn: 'root',
})
export class ContractVtService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Array<ContractVt>> {
    return this.httpClient
      .get<Array<ContractVt>>(`${environment.endPoint}${environment.apiPaths.contract_vt.get}`)
      .toPromise();
  }
  getById(id: String): Promise<ContractVt> {
    return this.httpClient
      .get<ContractVt>(`${environment.endPoint}${environment.apiPaths.contract_vt.get}${id}`)
      .toPromise();
  }
  getAppendixById(id: String): Promise<Array<ContractVtAnnex>> {
    return this.httpClient
      .get<Array<ContractVtAnnex>>(`${environment.endPoint}${environment.apiPaths.contract_vt.get}${id}/Appendix`)
      .toPromise();
  }
}
