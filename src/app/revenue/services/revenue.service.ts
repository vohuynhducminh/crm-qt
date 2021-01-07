import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Revenue } from '../models/revenue';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  constructor(private httpClient: HttpClient) { }

  getAll(year?: number): Promise<Array<Revenue>> {
    const search = year ? year : new Date().getFullYear();
    return this.httpClient
      .get<Array<Revenue>>(`${environment.endPoint}${environment.apiPaths.revenue.get}?year=${search}`)
      .toPromise();
  }
}
