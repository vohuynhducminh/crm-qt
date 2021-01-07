import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerType, MarketType } from '../models/customer-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  constructor(private httpClient: HttpClient) { }

  getCustomerTypeDashboard(): Promise<CustomerType[]> {
    return this.httpClient.get<CustomerType[]>(
      `${environment.endPoint}${environment.apiPaths.statistic.get}`
    ).toPromise();
  }

  getMarketTypeDashboard(): Promise<MarketType[]> {
    return this.httpClient.get<MarketType[]>(
      `${environment.endPoint}${environment.apiPaths.dashboard.get}${environment.apiPaths.dashboard.marketType}`
    ).toPromise();
  }
}
