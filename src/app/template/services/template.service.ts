import { Injectable } from '@angular/core';
import { TemplateVM, WorkFlowInstanceVM } from '../models/template-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTemplate(id?: string): Promise<TemplateVM[]> {
    return this.httpClient.get<TemplateVM[]>(
    `${environment.endPoint}${environment.apiPaths.template.get}`,
    {
      params: {
        instanceId: id,
      },
    })
    .toPromise();
  }

  getWorkFlowInstance(): Promise<WorkFlowInstanceVM[]> {
    return this.httpClient.get<any[]>(`${environment.endPoint + environment.apiPaths.workFlowInstance.get}`)
    .toPromise();
  }

  createTemplate(fileUL: FormData,  id: string): Promise<any> {
    return this.httpClient.post(
    `${environment.endPoint}${environment.apiPaths.template.post}`,
    {
      params: {
        instanceId: id,
      },
      fileUL,
    })
    .toPromise();
  }

  deleteTemplate(id: string): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint}${environment.apiPaths.template.delete}`, {
        params: {
          id: id,
        },
      })
    .toPromise();
  }
}
