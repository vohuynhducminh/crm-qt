import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RevenueVt } from '../models/revenue-vt';

@Injectable({
  providedIn: 'root',
})
export class RevenueVtService {
  constructor(private httpClient: HttpClient) { }

  getAll(year?: number): Promise<Array<RevenueVt>> {
    const search = year ? year : new Date().getFullYear();
    return this.httpClient
      .get<Array<RevenueVt>>(`${environment.endPoint}${environment.apiPaths.revenue.getVt}?year=${search}`)
      .toPromise();
  }

  getById(id: string): Promise<RevenueVt> {
    return this.httpClient
      .get<RevenueVt>(`${environment.endPoint}${environment.apiPaths.revenue.getVtDetail}${id}${environment.apiPaths.revenue.detail}`)
      .toPromise();
  }
}
