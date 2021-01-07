import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customer/models/customer';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss'],
})
export class ExportExcelComponent implements OnInit {
  customerSubscription: Subscription;
  data: any[];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerSubscription = this.customerService.customerSubject.subscribe(
      (customerList: Customer[]) => {
        this.data = customerList.map(e => {
          const res = { ... e };
          res['DeputyGenderStr'] = res.DeputyVM.Gender === 0 ? 'Nam' : 'Nữ';
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
          return res;
        });
      }
    );
  }

}
