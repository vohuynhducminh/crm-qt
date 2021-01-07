import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractCM } from '../models/contract';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(private httpClient: HttpClient) { }

  createContract(model: ContractCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.contract.post}`,
      model
    ).toPromise();
  }

  downloadContractFile(fileId: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.downloadFile}${fileId}`,
      {
        responseType: 'blob',
      }
    ).toPromise();
  }
}
