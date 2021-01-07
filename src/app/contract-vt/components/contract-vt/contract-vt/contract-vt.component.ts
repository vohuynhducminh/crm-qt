import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ContractVt } from 'src/app/contract-vt/models';
import { ContractVtService } from 'src/app/contract-vt/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-vt',
  templateUrl: './contract-vt.component.html',
  styleUrls: ['./contract-vt.component.scss'],
  providers: [DatePipe],
})
export class ContractVtComponent implements OnInit {
  listContractTelecome: Array<ContractVt>;
  constructor(
    public contractVtService: ContractVtService,
    private router: Router,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.listContractTelecome = new Array<ContractVt>();
    this.contractVtService
      .getAll()
      .then((list) => {
        list.forEach((contractTelecome) => {
          contractTelecome.ContractCode =
            this.datepipe.transform(contractTelecome.DateSigned, 'MM-yyyy') +
            '/' +
            contractTelecome.ContractNo;
          contractTelecome.DateSigned = this.datepipe.transform(
            contractTelecome.DateSigned,
            'dd/MM/yyyy'
          );
          contractTelecome.DateStart = this.datepipe.transform(
            contractTelecome.DateStart,
            'dd/MM/yyyy'
          );
          contractTelecome.DateEnd = this.datepipe.transform(
            contractTelecome.DateEnd,
            'dd/MM/yyyy'
          );
        });
        this.listContractTelecome = list;
      })
      .catch((err) => {
        this.listContractTelecome = new Array<ContractVt>();
        console.error(err);
      });
  }

  viewInfo(contractVt: any) {
    this.router.navigate([`/contract-vt/${contractVt.Id}`]);
  }
}
