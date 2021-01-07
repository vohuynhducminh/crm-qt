import { Injectable } from '@angular/core';
import { FormResponse, FormCM, Form } from 'src/app/core/models/form';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkFlowInstanceFormService {

  constructor(private httpClient: HttpClient) { }

  getForm(): Promise<Form[]> {
    return this.httpClient.get<Form[]>(
      `${environment.endPoint}${environment.apiPaths.form.get}`
    ).toPromise();
  }

  createForm(formCM: FormCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.form.post}`,
      formCM
    ).toPromise();
  }

  updateForm(formCM: FormCM): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.form.put}`,
      formCM
    ).toPromise();
  }

  deleteForm(id: string): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint}${environment.apiPaths.form.delete}${id}`
    ).toPromise();
  }

  getFormById(id: string): Promise<Form> {
    return this.httpClient.get<Form>(
      `${environment.endPoint}${environment.apiPaths.form.get}${id}`
    ).toPromise();
  }

  getFormGroupsById(id: string): Promise<FormResponse> {
    return this.httpClient.get<FormResponse>(
      `${environment.endPoint}${environment.apiPaths.form.get}${id}${environment.apiPaths.form.getFormGroups}`
    ).toPromise();
  }
}
