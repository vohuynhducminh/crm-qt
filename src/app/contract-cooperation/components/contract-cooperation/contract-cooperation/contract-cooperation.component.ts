import { Component, OnInit } from '@angular/core';
import { ContractCooperationService, ContractCooperationCustomerService } from 'src/app/contract-cooperation/services';
import { ContractCooperation, Telecom, Customer } from 'src/app/contract-cooperation/models';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-cooperation',
  templateUrl: './contract-cooperation.component.html',
  styleUrls: ['./contract-cooperation.component.scss'],
})
export class ContractCooperationComponent implements OnInit {
  data: ContractCooperation[] = [];
  customers: Customer[] = [];
  services: Telecom[] = [];
  constructor(
    private router: Router,
    private contractCooperationService: ContractCooperationService,
    private contractCooperationCustomerService: ContractCooperationCustomerService
  ) { }

  async ngOnInit() {
    await this.loadCustomer();
    await this.loadContract();
  }

  async loadContract() {
    await this.contractCooperationService.getAll()
      .then((res) => {
        this.data = res.map(e => {
          const model: any = { ...e };
          model.ParnerName = this.returnCustomer(e.ParnerId) ? this.returnCustomer(e.ParnerId).Name : '';
          return model;
        });
      });
  }
  async loadCustomer() {
    await this.contractCooperationCustomerService.getAll()
      .then((res) => this.customers = res.map(e => e));
  }
  viewInfo(id: string) {
    this.router.navigate([`/contract-cooperation/${id}`]);
  }
  returnCustomer(id: string): Customer {
    return this.customers.find(customer => customer.Id === id);
  }
}
