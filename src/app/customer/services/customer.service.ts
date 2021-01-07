import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerCM, CustomerType, PagingVM } from '../models/customer';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { CustomerCare, CustomerCareCM, CustomerCareUM } from '../models/customer-care';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  selectedCustomer: Customer;
  customerList: Customer[];
  customerTypeList: CustomerType[];
  formattedCustomerList: any;
  customerSubject: Subject<Customer[]> = new Subject<Customer[]>();
  customerTypeSubject: Subject<CustomerType[]> = new Subject<CustomerType[]>();

  constructor(private httpClient: HttpClient) { }

  getCustomer(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(
      `${environment.endPoint}${environment.apiPaths.customer.get}`
    ).toPromise();
  }

  exportCustomers(): Promise<any> {
    return this.httpClient.get<any>(
      `${environment.endPoint}${environment.apiPaths.customer.get}ExportWithURL`
    ).toPromise();
  }

  getCustomersByListId(ids: string[]): Promise<Customer[]> {
    return this.httpClient.post<Customer[]>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${environment.apiPaths.customer.getByListId}`,
      ids
    ).toPromise();
  }

  getCustomerById(id: string, selectedDate?: string): Promise<Customer> {
    const query = selectedDate ? '?selectedDate=' + selectedDate : '';
    return this.httpClient.get<Customer>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${query}`
    ).toPromise();
  }

  createCustomer(customerCM: CustomerCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.customer.post}`,
      customerCM
    ).toPromise();
  }

  updateCustomer(customer: Customer): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.customer.put}`,
      customer
    ).toPromise();
  }

  removeCustomer(customer: Customer): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint}${environment.apiPaths.customer.delete}/${customer.Id}`
    ).toPromise();
  }

  setCustomerList(customerList: Customer[]) {
    this.customerList = customerList;
    this.customerSubject.next(customerList);
    this.formattedCustomerList = (this.customerList as any[]).map(e => {
      const res = JSON.parse(JSON.stringify(e));
      // gender
      res['DeputyGender'] = res.DeputyGender === 0 ? 'Nam' : 'Nữ';
      // map by
      [
        {
          field: 'CustomerTypeId',
          list: this.customerTypeList,
          matchedProp: 'Id',
          resultProp: 'Name',
        },
      ].forEach((element) => {
        let result: any = null;
        if (element.list && element.list.length > 0) {
          const pilot = element.list.find(x => x.hasOwnProperty(element.matchedProp) && x[element.matchedProp] === res[element.field]);
          if (pilot) {
            result = pilot[element.resultProp];
          }
        }
        res[element.field] = result;
      });
      // date
      [
        'InvestmentCertificateDate',
        'BusinessLicenseDate',
        'DateEstablish',
        'ContractNoDateRegister',
        'ContractNoDateOut',
      ].forEach((field) => {
        if (res[field]) {
          const dateStr = res[field].split('T')[0];
          const dateArr = dateStr.split('-');
          res[field] = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
        }
      });
      // dirty date
      [
        'YearStarted',
        'YearEnded',
      ].forEach((field) => {
        if (res[field]) {
          if (!(+res[field])) {
            const arrYS = res[field].split('_');
            if (arrYS.length === 2) {
              res[field] = `${+arrYS[1] > 9 ? +arrYS[1] : ('0' + +arrYS[1])}/${+arrYS[0]}`;
            } else {
              const dateStr = res[field].split('T')[0];
              const dateArr = dateStr.split('-');
              res[field] = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
            }
          }
        }
      });
      // null number
      [
        'TotalInvestment',
        'Investment',
        'StaffCount',
      ].forEach((field) => {
        const value = res[field];
        if (value === 0) {
          res[field] = null;
        } else {
          const valueStr = `${value}`;
          const valueArr = valueStr.split('.');
          let thousands = valueArr[0];
          let result = '';
          while (thousands.length > 3) {
            const next = thousands.substr(thousands.length - 3);
            thousands = thousands.substr(0, thousands.length - 3);
            result = `.${next}${result}`;
          }
          result = `${thousands}${result}`;
          if (valueArr.length === 2) {
            result = `${result},${valueArr[1]}`;
          }
          res[field] = result;
        }
      });
      // json array
      [
        'MarketType',
        'ObjectType',
      ].forEach((field) => {
        let result = res[field];
        try {
          const arr = JSON.parse(res[field]);
          if (arr && Array.isArray(arr) && arr.length > 0) {
            result = arr.map(x => '- $'.split('$').join(x)).join('\n');
          }
        } catch (e) {
          result = `- ${result}`;
        }
        res[field] = result;
      });
      return res;
    });
  }

  setCustomerTypeList(customerTypeList: CustomerType[]) {
    this.customerTypeList = customerTypeList;
    this.customerTypeSubject.next(customerTypeList);
  }

  getCustomerType(): Promise<CustomerType[]> {
    return this.httpClient.get<CustomerType[]>(
      `${environment.endPoint}${environment.apiPaths.statistic.get}`
    ).toPromise();
  }

  getCustomersPagingByNameAndAddress(
    name = '',
    address = '',
    index = 1,
    pageSize = 10
  ): Promise<PagingVM> {
    return this.httpClient.get<PagingVM>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${environment.apiPaths.customer.paging}`,
      {
        params: {
          name: name,
          address: address,
          index: `${index}`,
          pageSize: `${pageSize}`,
        },
      }
    ).toPromise();
  }

  getCustomerContactsPagingByNamePosCus(
    name = '',
    position = '',
    customer = '',
    index = 1,
    pageSize = 10
  ): Promise<PagingVM> {
    return this.httpClient.get<PagingVM>(
      `${environment.endPoint}${environment.apiPaths.contact.getAll}`,
      {
        params: {
          name: name,
          position: position,
          customer: customer,
          index: `${index}`,
          pageSize: `${pageSize}`,
        },
      }
    ).toPromise();
  }

  getCustomerContactsByListId(ids: string[]): Promise<Customer[]> {
    return this.httpClient.post<Customer[]>(
      `${environment.endPoint}${environment.apiPaths.contact.get}${environment.apiPaths.contact.getByListId}`,
      ids
    ).toPromise();
  }

  getCustomerCareHistories(id: string): Promise<CustomerCare[]> {
    return this.httpClient.get<CustomerCare[]>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.careHistory.get}`
    ).toPromise();
  }

  createCustomerCareHistory(id: string, customerCareCM: CustomerCareCM): Promise<any> {
    return this.httpClient.post<any>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.careHistory.post}`,
      customerCareCM
    ).toPromise();
  }

  updateCustomerCareHistory(id: string, customerCareUM: CustomerCareUM): Promise<any> {
    return this.httpClient.put<any>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.careHistory.put}`,
      customerCareUM
    ).toPromise();
  }

  deleteCustomerCareHistory(id: string, customerCareId: string): Promise<any> {
    return this.httpClient.delete<any>(
      `${environment.endPoint}${environment.apiPaths.customer.get}${id}${environment.apiPaths.careHistory.delete}`,
      {
        params: {
          id: customerCareId,
        },
      }
    ).toPromise();
  }

  importFileExcel(values): Observable<any>{    
    console.log(values);
    var formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]); 
      console.log(key);
    }           
    // return environment.post('api/Customers/ImportCustomerExcel', formData);
    return this.httpClient
    .post(`${environment.endPoint}/api/Customers/ImportCustomerExcel`, formData);
  }
}
