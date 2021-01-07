import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContractCooperationCustomerService {
  api = environment.apiPaths;
  endPoint = environment.endPoint;
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(
      `${this.endPoint}${this.api.customer.get}`
    ).toPromise();
  }

  getById(id: string): Promise<Customer> {
    return this.httpClient.get<Customer>(
      `${this.endPoint}${this.api.customer.get}${id}`
    ).toPromise();
  }

}
