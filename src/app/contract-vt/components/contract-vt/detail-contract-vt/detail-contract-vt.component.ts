import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContractVt } from 'src/app/contract-vt/models';
import { ContractVtService } from 'src/app/contract-vt/services';

@Component({
  selector: 'app-detail-contract-vt',
  templateUrl: './detail-contract-vt.component.html',
  styleUrls: ['./detail-contract-vt.component.scss'],
  providers: [DatePipe],
})
export class DetailContractVtComponent implements OnInit {
  currentContract: ContractVt;

  constructor(
    public contractVtService: ContractVtService,
    private datepipe: DatePipe,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.router);
    this.currentContract = new ContractVt();
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.contractVtService.getById(id).then(
        contractTelecome => {
          contractTelecome.BirthDate = this.datepipe.transform(contractTelecome.BirthDate, 'dd/MM/yyyy');
          contractTelecome.DateSigned = this.datepipe.transform(contractTelecome.DateSigned, 'dd/MM/yyyy');
          contractTelecome.DateStart = this.datepipe.transform(contractTelecome.DateStart, 'dd/MM/yyyy');
          contractTelecome.DateEnd = this.datepipe.transform(contractTelecome.DateEnd, 'dd/MM/yyyy');
          contractTelecome.Gender = contractTelecome.Gender = '0' ? 'Nữ' : 'Nam';
          this.currentContract = contractTelecome;
        }
      ).catch(err => this.currentContract = new ContractVt());
    });
  }

}
