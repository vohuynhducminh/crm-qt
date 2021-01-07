import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormVM, FormCM, FormUM, GlobalVariableVM } from '../models/form';
import { environment } from 'src/environments/environment';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getGlobalVariableByWorkFlowId(workFlowId: string): Promise<GlobalVariableVM[]> {
    return this.httpClient
      .get<GlobalVariableVM[]>(`${environment.endPoint}${environment.apiPaths.globalVariable.get}${workFlowId}`)
      .toPromise();
  }

  getWorkFlowList(): Promise<WorkFlow[]> {
    return this.httpClient
      .get<WorkFlow[]>(`${environment.endPoint}${environment.apiPaths.workFlow.get}`)
      .toPromise();
  }

  getForm(): Promise<FormVM[]> {
    return this.httpClient.get<FormVM[]>(
      `${environment.endPoint}${environment.apiPaths.form.get}`
    ).toPromise();
  }

  createForm(formCM: FormCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.form.post}`,
      formCM
    ).toPromise();
  }

  deleteForm(form: FormVM): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint}${environment.apiPaths.form.delete}${form.Id}`
    ).toPromise();
  }

  updateForm(formUM: FormUM): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.form.put}`, formUM
    ).toPromise();
  }

  getFormFormGroupById(id: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.form.get}${id}${environment.apiPaths.form.getFormGroups}`
    ).toPromise();
  }
}
