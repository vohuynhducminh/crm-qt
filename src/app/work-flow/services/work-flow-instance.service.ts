import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkFlowInstance, WorkFlowInstanceCM } from '../models/work-flow-instance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkFlowInstanceService {

  constructor(private httpClient: HttpClient) { }

  getWorkFlowInstanceList(workFlowId: string): Promise<WorkFlowInstance[]> {
    return this.httpClient.get<WorkFlowInstance[]>(
      `${environment.endPoint
        + environment.apiPaths.workFlowInstance.getByWorkFlowId
        + workFlowId}`)
        .toPromise();
  }

  getWorkFlowInstance(workFlowInstanceId: string): Promise<WorkFlowInstance> {
    return this.httpClient.get<WorkFlowInstance>(
      `${environment.endPoint}${environment.apiPaths.workFlowInstance.get}${workFlowInstanceId}`
      ).toPromise();
  }

  createWorkFlowInstance(workFlowInstanceCM: WorkFlowInstanceCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.workFlowInstance.post}`,
      workFlowInstanceCM)
        .toPromise();
  }

  updateWorkFlowInstance(workFlowInstance: WorkFlowInstance): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint + environment.apiPaths.workFlowInstance.put}`,
      workFlowInstance)
      .toPromise();
  }

  deleteWorkFlowInstance(workFlowInstance: WorkFlowInstance): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.workFlowInstance.delete + workFlowInstance.Id}`
    ).toPromise();
  }

  getWFInstanceTemplates(workFlowInstanceId: string): Promise<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.endPoint}${environment.apiPaths.template.get}`,
      {
        params: {
          instanceId: workFlowInstanceId,
        },
      }
    ).toPromise();
  }

  setTemplateForm(templateId: string, formId: string): Promise<any[]> {
    return this.httpClient.put<any[]>(
      `${environment.endPoint}${environment.apiPaths.template.put}${environment.apiPaths.template.addForm}?templateId=${templateId}&formID=${formId}`,
      {}
    ).toPromise();
  }

  setWFInstanceForm(workFlowInstanceId: string, formId: string): Promise<any[]> {
    return this.httpClient.put<any[]>(
      `${environment.endPoint}${environment.apiPaths.workFlowInstance.put}${workFlowInstanceId}${environment.apiPaths.workFlowInstance.setForm}${formId}`,
      {}
    ).toPromise();
  }

}
