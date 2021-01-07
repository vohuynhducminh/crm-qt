import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerWorkFlow, CustomerWorkFlowFile } from '../models/customer-work-flow';
import { Customer } from 'src/app/customer/models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerWorkFlowService {
  customerInWorkFlow: Customer;

  constructor(private httpClient: HttpClient) { }

  getCustomerWorkFlow(id: string): Promise<CustomerWorkFlow> {
    return this.httpClient.get<CustomerWorkFlow>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.get}${id}`
    ).toPromise();
  }

  getFiles(customerWorkFlowId: string): Promise<CustomerWorkFlowFile[]> {
    return this.httpClient.get<CustomerWorkFlowFile[]>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.get}${environment.apiPaths.customerWorkFlow.getFiles}`,
      {
        params: {
          customerWorkFlowId: customerWorkFlowId,
        },
      }
    ).toPromise();
  }

  delete(id: string): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.get}${id}`
    ).toPromise();
  }

  downloadFileGV(id: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.globalVariableValue.get}${id}${environment.apiPaths.globalVariableValue.downloadFile}`,
      {
        responseType: 'blob',
      }
    ).toPromise();
  }

  downloadFileWFH(id: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.downloadFile}${id}`,
      {
        responseType: 'blob',
      }
    ).toPromise();
  }
}
