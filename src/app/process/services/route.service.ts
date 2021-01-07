import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Route, RouteCM } from '../models/route';

@Injectable({
  providedIn: 'root',
})
export class RouteService {

  constructor(private httpClient: HttpClient) { }

  getRoute(currentProcessId: string, customerWorkFlowId: string): Promise<Route> {
    return this.httpClient.get<Route>(
      `${environment.endPoint}${environment.apiPaths.route.get}`,
      {
        params: {
          instanceId: currentProcessId,
          customerWorkFlowId: customerWorkFlowId,
        },
      }
    ).toPromise();
  }

  createRoute(routeCM: RouteCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.route.post}`,
      routeCM
    ).toPromise();
  }
}
