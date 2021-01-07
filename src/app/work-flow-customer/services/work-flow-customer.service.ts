import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { CustomerWorkFlowCM } from 'src/app/customer/models/customer-work-flow';
import { WorkFlowCustomer } from '../models/work-flow-customer';

@Injectable({
  providedIn: 'root',
})
export class WorkFlowCustomerService {

  constructor(private httpClient: HttpClient) { }

  getWorkFlowCustomerByWorkFlow(workFlow: WorkFlow): Promise<WorkFlowCustomer[]> {
    return this.httpClient.get<WorkFlowCustomer[]>(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.getByWorkFlowId}${workFlow.Id}`
    ).toPromise();
  }

  createWorkFlowCustomer(customerWorkFlowCM: CustomerWorkFlowCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.post}`,
      customerWorkFlowCM
    ).toPromise();
  }

  isInWorkflow(customerWorkFlowCM: CustomerWorkFlowCM) {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.customerWorkFlow.isInWorkflow}`,
      {
        params: {
          CustomerId: customerWorkFlowCM.CustomerId,
          WorkFlowId: customerWorkFlowCM.WorkFlowId,
        },
      }
    ).toPromise();
  }

}
