import { Component, OnInit } from '@angular/core';
import { RevenueVtService } from 'src/app/revenue-vt/services/revenue-vt.service';
import { RevenueVt } from 'src/app/revenue-vt/models/revenue-vt';
import { Router } from '@angular/router';
import { ContractVtService } from 'src/app/contract-vt/services/contract-vt.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-list-revenue-vt',
  templateUrl: './list-revenue-vt.component.html',
  styleUrls: ['./list-revenue-vt.component.scss'],
  providers: [DecimalPipe],
})
export class ListRevenueVtComponent implements OnInit {
  revenueVts: RevenueVt[];
  constructor(
    private _revenueVtService: RevenueVtService,
    private router: Router,
    public contractVtService: ContractVtService,
    private decimalPipe: DecimalPipe
  ) { }
  years: number[];
  selectedYear: number = new Date().getFullYear();
  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }
  ngOnInit() {
    this.years = [];
    for (let index = 2010; index <= new Date().getFullYear(); index++) {
      this.years.push(index);
    }
    this.years.reverse();
    this.load();
  }
  load() {
    this._revenueVtService.getAll(this.selectedYear).then(
      res => {
        this.revenueVts = res;
      }
    );
  }

  viewInfo(revenueVt: any) {
    this.router.navigate([`/revenue-vt/${revenueVt.ContractId}`]);
  }

}
