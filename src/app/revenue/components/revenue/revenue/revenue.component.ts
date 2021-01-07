import { Component, OnInit } from '@angular/core';
import { RevenueService } from 'src/app/revenue/services/revenue.service';
import { Revenue } from 'src/app/revenue/models/revenue';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
  providers: [DecimalPipe],
})
export class RevenueComponent implements OnInit {
  revenues: Revenue[];
  
  constructor(private _revenueService: RevenueService, private decimalPipe: DecimalPipe) { }
  years: number[];
  selectedYear: number = new Date().getFullYear();
  ngOnInit() {
    this.years = [];
    for (let index = 2010; index <= new Date().getFullYear(); index++) {
      this.years.push(index);
    }
    this.years.reverse();
    this.load();
  }
  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }
  load() {
    this._revenueService.getAll(this.selectedYear).then(
      res => {
        this.revenues = res;
      }
    );
  }  
}
