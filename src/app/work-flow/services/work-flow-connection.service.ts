import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkFlowInstance } from '../models/work-flow-instance';
import { WorkFlowConnection, WorkFlowConnectionCM } from '../models/work-flow-connection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkFlowConnectionService {

  constructor(private httpClient: HttpClient) { }

  getWorkFlowByFromConnection(workFlowInstance: WorkFlowInstance): Promise<WorkFlowConnection[]> {
    return this.httpClient.get<WorkFlowConnection[]>(
      `${environment.endPoint + environment.apiPaths.workFlowConnection.getByFromInstanceId + workFlowInstance.Id}`
    ).toPromise();
  }

  createWorkFlowConnection(workFlowConnectionCM: WorkFlowConnectionCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.workFlowConnection.post}`,
      workFlowConnectionCM
    ).toPromise();
  }

  updateWorkFlowConnection(workFlowConnection: WorkFlowConnection): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.workFlowConnection.put}`,
      workFlowConnection
    ).toPromise();
  }

  deleteWorkFlowConnection(workFlowConnection: WorkFlowConnection): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.workFlowConnection.delete + workFlowConnection.Id}`
    ).toPromise();
  }

}
