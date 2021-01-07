import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from 'src/app/contract/services/contract.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.scss'],
  providers: [DecimalPipe],
})
export class DetailContractComponent implements OnInit {
  currentContract: any;

  currencyMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
  });

  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });

  percentageMask = createNumberMask({
    prefix: '',
    suffix: '%',
    thousandsSeparatorSymbol: '.',
    integerLimit: 2,
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
  });

  constructor(
    private contractService: ContractService,
    private route: ActivatedRoute,
    private decimal: DecimalPipe
  ) { }

  ngOnInit() {
    if (!this.currentContract) {
      this.route.params.subscribe(params => {
        this.getContractById(params['id']);
      });
    }
  }

  getContractById(id: string) {
    this.contractService.getContractById(id)
      .then(
        (response: any) => {
          Object.keys(response).forEach((e) => {
            if (response[e]) {
              if (typeof response[e] === 'number') {
                if (e.includes('Square') && (response[e] + '').includes('.')) {
                  const tag = (response[e] + '').split('.');
                  tag[0] = tag[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                  response[e] = tag[0] + ',' + tag[1];
                } else {
                  response[e] = (response[e] + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
              }
            }
          });
          this.currentContract = response;
        },
        error => console.error(error)
      );
  }

}
