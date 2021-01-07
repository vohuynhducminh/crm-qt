import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerWorkFlowCM, CustomerWorkFlow } from '../models/customer-work-flow';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';

@Injectable({
  providedIn: 'root',
})
export class CustomerWorkFlowService {

  constructor(private httpClient: HttpClient) { }

  getCustomerWorkFlowList(): Promise<CustomerWorkFlow[]> {
    return this.httpClient.get<CustomerWorkFlow[]>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.get}`
    ).toPromise();
  }

  getCustomerWorkFlowByCustomer(customer: Customer): Promise<WorkFlow[]> {
    return this.httpClient.get<WorkFlow[]>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.getByCustomerId}${customer.Id}`
    ).toPromise();
  }

  createCustomerWorkFlow(customerWorkFlowCM: CustomerWorkFlowCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.post}`,
      customerWorkFlowCM
    ).toPromise();
  }
}
