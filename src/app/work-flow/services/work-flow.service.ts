import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkFlow, WorkFlowCM } from '../models/work-flow';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkFlowService {

  constructor(private httpClient: HttpClient) { }

  getWorkFlowList(): Promise<WorkFlow[]> {
    return this.httpClient
      .get<WorkFlow[]>(`${environment.endPoint + environment.apiPaths.workFlow.get}`)
      .toPromise();
  }
  getWorkFlow(workFlowId: string): Promise<WorkFlow> {
    return this.httpClient
      .get<WorkFlow>(`${environment.endPoint + environment.apiPaths.workFlow.get}${workFlowId}`)
      .toPromise();
  }

  createWorkFlow(workFlowCM: WorkFlowCM): Promise<any> {
    return this.httpClient
      .post(`${environment.endPoint + environment.apiPaths.workFlow.post}`, workFlowCM)
      .toPromise();
  }

  updateWorkFlow(workFlow: WorkFlow): Promise<any> {
    return this.httpClient
      .put(`${environment.endPoint + environment.apiPaths.workFlow.put}`, workFlow)
      .toPromise();
  }

  deleteWorkFlow(workFlow: WorkFlow): Promise<any> {
    return this.httpClient
      .delete(`${environment.endPoint + environment.apiPaths.workFlow.delete + workFlow.Id}`)
      .toPromise();
  }

  getWorkFlowForm(workFlowId: string): Promise<any> {
    return this.httpClient
      .get<any>(`${environment.endPoint}${environment.apiPaths.workFlow.get}${workFlowId}${environment.apiPaths.workFlow.getForm}`)
      .toPromise();
  }

}
