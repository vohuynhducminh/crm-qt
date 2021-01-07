import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/contract/services/contract.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
  providers: [DatePipe, DecimalPipe],
})
export class ContractComponent implements OnInit {
  data: any[] = [];

  constructor(
    public contractService: ContractService,
    private router: Router,
    private datepipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.getData();
  }
  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }
  getData() {
    this.contractService.getContract()
      .then(
        (response: any[]) => {
          response.forEach(item => {
            item.ContractCode = this.datepipe.transform(item.StartDate, 'MM-yyyy') + '/' + item.ContractNo;
          });
          this.data = response;
        },
        error => console.error(error)
      );
  }

  viewInfo(contract: any) {
    this.contractService.selectedContract = contract;
    this.router.navigate([`/contract/${contract.Id}`]);
  }
}
