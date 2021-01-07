import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RevenueVt } from 'src/app/revenue-vt/models/revenue-vt';
import { RevenueVtService } from 'src/app/revenue-vt/services/revenue-vt.service';

@Component({
  selector: 'app-detail-revenue-vt',
  templateUrl: './detail-revenue-vt.component.html',
  styleUrls: ['./detail-revenue-vt.component.scss'],
  providers: [DecimalPipe],
})
export class DetailRevenueVtComponent implements OnInit {
  listServiceRevenueVt: any[];
  currentRevenue: RevenueVt;

  constructor(
    public revenueVtService: RevenueVtService,
    private router: ActivatedRoute,
    private decimalPipe: DecimalPipe
  ) { }
  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }
  ngOnInit() {
    this.currentRevenue = new RevenueVt();
    this.listServiceRevenueVt = [];
    this.router.params.subscribe(params => {
      const id = params['ContractId'];
      this.revenueVtService.getById(id).then(
        revenueVtDetail => {
          this.currentRevenue = revenueVtDetail;
          this.listServiceRevenueVt = revenueVtDetail.Services;
          this.listServiceRevenueVt.forEach(s => {
            const dataText = [];
            for (const key in s.Data as Object) {
              if (s.Data.hasOwnProperty(key)) {
                dataText.push(key + ' : ' + s.Data[key]);
              }
            }
            s.Data = JSON.stringify(dataText);
          });
        }
      ).catch(err => this.currentRevenue = new RevenueVt());
    });
  }

}
