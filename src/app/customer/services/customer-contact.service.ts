import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerContactVM, CustomerContactCM } from '../models/customer-contact';

@Injectable({
  providedIn: 'root',
})
export class CustomerContactService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCustomerContactByCustomer(id: string): Promise<CustomerContactVM[]> {
    return this.httpClient.get<CustomerContactVM[]>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.customer.contact}`
    ).toPromise();
  }

  createCustomerContactByCustomer(id: string, customerContact: CustomerContactCM): Promise<any> {
    return this.httpClient.post<any>(
      `${environment.endPoint}${environment.apiPaths.customer.post}${id}${environment.apiPaths.customer.contact}`
      , customerContact).toPromise();
  }

  updateCustomerContactByCustomer(id: string, customerContact: CustomerContactCM): Promise<any> {
    return this.httpClient.put<any>(
      `${environment.endPoint}${environment.apiPaths.customer.put}${id}${environment.apiPaths.customer.contact}`
      , customerContact).toPromise();
  }

  deleteCustomerContactByCustomer(id: string, contactId: string): Promise<CustomerContactVM[]> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.customer.contact}${contactId}`
    ).toPromise();
  }
}
