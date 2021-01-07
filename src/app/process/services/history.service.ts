import { Injectable } from '@angular/core';
import { History } from '../models/history';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormResponse } from 'src/app/core/models/form';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {

  constructor(private httpClient: HttpClient) { }

  getHistory(customerWorkFlowId: string): Promise<History[]> {
    return this.httpClient.get<History[]>(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.get}`,
      {
        params: {
          customerWorkFlowId: customerWorkFlowId,
        },
      }
    ).toPromise();
  }

  getForm(historyId: string): Promise<FormResponse> {
    return this.httpClient.get<FormResponse>(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.getForm}`,
      {
        params: {
          id: historyId,
        },
      }
    ).toPromise();
  }

  getFiles(historyId: string): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.getFiles}`,
      {
        params: {
          id: historyId,
        },
      }
    ).toPromise();
  }

  getTemplates(historyId: string): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.getTemplates}`,
      {
        params: {
          id: historyId,
        },
      }
    ).toPromise();
  }

  createForm(processId: string, formValue: any): Promise<any> {
    console.log('createForm from HistoryService, formValue: ', formValue);
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.postForm}`,
      {
        ProcessId: processId,
        FormData: formValue,
      }
    ).toPromise();
  }

  downloadHistoryFile(fileId: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.workFlowHistory.downloadFile}${fileId}`,
      {
        responseType: 'blob',
      }
    ).toPromise();
  }
}
