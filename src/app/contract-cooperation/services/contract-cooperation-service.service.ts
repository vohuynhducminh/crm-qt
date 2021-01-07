import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContractCooperationService } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContractCooperationServiceService {
  api = environment.apiPaths;
  endPoint = environment.endPoint;
  constructor(private http: HttpClient) { }

  getAll(id: string): Promise<Array<ContractCooperationService>> {
    return this.http
      .get<Array<ContractCooperationService>>(`${this.endPoint}${this.api.contract_cooperation.main}/${id}/${this.api.contract_cooperation.service}`)
      .toPromise();
  }
  getById(id: String): Promise<ContractCooperationService> {
    return this.http
      .get<ContractCooperationService>(`${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}/${id}`)
      .toPromise();
  }
  delete(id: String): Promise<any> {
    return this.http
      .delete<any>(`${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}/${id}`)
      .toPromise();
  }

  close(id: String): Promise<any> {
    return this.http
      .put<any>(`${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}/${id}/${this.api.contract_cooperation.close}`, {})
      .toPromise();
  }

  create(data: ContractCooperationService): Promise<ContractCooperationService> {
    return this.http.post<ContractCooperationService>(
      `${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}`, data
    ).toPromise();
  }
  update(data: ContractCooperationService): Promise<any> {
    return this.http.put<any>(
      `${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}`, data
    ).toPromise();
  }
  downloadFile(link: string): void {
    this.http.get(
      `${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.file}?appendixLink=${link}`,
      {
        responseType: 'blob',
      }
    ).toPromise().then((res) => {
      const data = document.createElement('a');
      data.href = window.URL.createObjectURL(res);
      data.download = link.split('\\')[3];
      data.click();
    });

  }
  updateFile(id: string, data: FormData): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = { headers: headers };
    return this.http.put<any>(
      `${this.endPoint}${this.api.contract_cooperation.main}/${this.api.contract_cooperation.service}/${id}/${this.api.contract_cooperation.file}`, data, options
    ).toPromise();
  }
}
