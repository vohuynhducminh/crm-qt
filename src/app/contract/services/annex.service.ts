import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, parseObject } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AnnexService {

  constructor(private httpClient: HttpClient) { }

  createAnnex(data: any): Promise<any> {
    data = parseObject(
      data,
      {
        matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
      }
    );
    return this.httpClient.post<any>(
      `${environment.endPoint}${environment.apiPaths.contract_annex.post}`, data
    ).toPromise();
  }

  updateAnnex(data: any): Promise<any> {
    data = parseObject(
      data,
      {
        matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
      }
    );
    return this.httpClient.put<any>(
      `${environment.endPoint}${environment.apiPaths.contract_annex.post}`, data
    ).toPromise();
  }

  deleteAnnex(id: string): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.contract_annex.get}${id}`
    ).toPromise();
  }

  close(id: string, date: string): Promise<any> {
    return this.httpClient.put<any[]>(
      `${environment.endPoint}${environment.apiPaths.contract_annex.get}${id}/Close?DateEnd=${date}`, {}
    ).toPromise();
  }
  payOff(id: string): Promise<any> {
    return this.httpClient.put<any>(
      `${environment.endPoint}${environment.apiPaths.contract_annex.get}${id}${environment.apiPaths.contract_annex.payOff}`, {}
    ).toPromise();
  }
}
