import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Customer, CustomerType } from 'src/app/customer/models/customer';
import { BsModalRef } from 'ngx-bootstrap';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Router } from '@angular/router';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @Output() kendoGridSelectChange: EventEmitter<void> = new EventEmitter<void>();


  fileExcel: File = null;
  data: Customer[] = [];
  filteredData: Customer[] = [];
  selecting: Customer;
  modalRef: BsModalRef;
  distinctNationalities: any[];
  distinctNationalityClassifications: any[];
  distinctCompanyTypes: any[];
  distinctSexes: any[];

  customerTypeList: CustomerType[];
  openSendExcel = false;
  email = '';
  public distinct = (data: any, field: string) => data
    .filter(
      (x: any, idx: any, xs: any) =>
        xs.findIndex((y: any) => y[field] === x[field]) === idx)

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  public allData(grid: GridComponent): ExcelExportData {
    const result: ExcelExportData = {
      data: process(
        this.customerService.formattedCustomerList,
        { filter: grid.filter }
      ).data,
    };
    return result;
  }

  ngOnInit() {
    this.getData();
    this.getCustomerType();
    this.allData = this.allData.bind(this);
  }

  getData() {
    this.customerService.getCustomer()
      .then((response: Customer[]) => {
        const solve: any = response;
        solve.forEach(element => {
          element.ObjectTypeJson = null;
          if (element.ObjectType) {
            element.ObjectTypeJson = '';
            element.ObjectType.forEach((e, i) => {
              element.ObjectTypeJson = element.ObjectTypeJson + e + (i === element.ObjectType.length - 1 ? '' : ', ');
            });
          }
          element.MarketTypeJson = null;
          if (element.MarketType) {
            element.MarketTypeJson = '';
            element.MarketType.forEach((e, i) => {
              element.MarketTypeJson = element.MarketTypeJson + e + (i === element.MarketType.length - 1 ? '' : ', ');
            });
          }
          element.CompanyTypeJson = null;
          if (element.CompanyType) {
            element.CompanyTypeJson = '';
            element.CompanyType.forEach((e, i) => {
              element.CompanyTypeJson = element.CompanyTypeJson + e + (i === element.CompanyType.length - 1 ? '' : ', ');
            });
          }
        });
        this.data = solve;
        this.customerService.setCustomerList(this.data);
        this.filteredData = solve;
        if (this.filteredData && this.filteredData.length > 0) {
          this.selecting = this.filteredData[0];
          this.distinctNationalities = [];
          let countries = this.distinct(this.filteredData, 'Country')
            .map((e: any) => ({ text: e['Country'], Country: e['Country'] }));
          countries = countries.filter(e => e.text && e.Country);
          countries.forEach(countrie => {
            if (this.distinctNationalities.findIndex(e => e.Country.toLowerCase() === countrie.Country.toLowerCase()) === -1) {
              this.distinctNationalities.push(countrie);
            }
          });
          this.distinctNationalityClassifications = this.distinct(this.filteredData, 'CountryType')
            .map((e: any) => ({ text: e['CountryType'], CountryType: e['CountryType'] }));
          this.distinctSexes = this.distinct(this.filteredData, 'Sex')
            .map((e: any) => ({ text: e['Sex'], Sex: e['Sex'] }));
          this.distinctCompanyTypes = this.distinct(this.filteredData, 'BusinessType')
            .map((e: any) => ({ text: e['BusinessType'], BusinessType: e['BusinessType'] }));
          this.filteredData = this.filteredData.map(res => {
            if (res['YearStarted']) {
              if (+res['YearStarted']) {
                const yS = new Date();
                yS.setFullYear(+res['YearStarted'], 0, 1);
                res['YearStarted'] = JSON.stringify(yS).split('"').join('');
              } else {
                const arrYS = res['YearStarted'].split('_');
                if (arrYS.length === 2) {
                  const yS = new Date();
                  yS.setFullYear(+arrYS[0], +arrYS[1] - 1, 1);
                  res['YearStarted'] = JSON.stringify(yS).split('"').join('');
                }
              }
            }
            if (res['YearEnded']) {
              if (+res['YearEnded']) {
                const yS = new Date();
                yS.setFullYear(+res['YearEnded'], 0, 1);
                res['YearEnded'] = JSON.stringify(yS).split('"').join('');
              } else {
                const arrYS = res['YearEnded'].split('_');
                if (arrYS.length === 2) {
                  const yS = new Date();
                  yS.setFullYear(+arrYS[0], +arrYS[1] - 1, 1);
                  res['YearEnded'] = JSON.stringify(yS).split('"').join('');
                }
              }
            }
            return res;
          });
        }
      })
      .catch(error => console.error(error));
  }

  onSelect({ selectedRows }) {
    if (selectedRows) {
      // selected is an array
      selectedRows = selectedRows[0];
      if (selectedRows !== this.selecting) {
        this.selecting = selectedRows.dataItem;
        this.filteredData = [...this.filteredData];
        this.kendoGridSelectChange.emit();
      }
    }
  }

  viewInfo(customer: Customer) {
    this.customerService.selectedCustomer = customer;
    this.router.navigate([`/customer/${customer.Id}`]);
  }

  getCustomerType() {
    this.customerService.getCustomerType()
      .then(
        (response: CustomerType[]) => {
          this.customerTypeList = response;
          this.customerService.setCustomerTypeList(this.customerTypeList);
          if (this.customerTypeList) {
            this.customerTypeList = this.customerTypeList.map(e => {
              e['CustomerTypeId'] = e.Id;
              return e;
            });
          }
        },
        error => console.error(error)
      );
  }
  sendExcel() {
    this.customerService.exportCustomers().then((res) => {
      swal('Thông báo', 'Quá trình xuất file cần thời gian để xử lý. Hệ thống sẽ gửi thông báo sau khi hoàn thành xuất file', 'warning');
    }).catch((err) => {
      swal('Thông báo', 'Xuất file thất bại. Vui lòng liên hệ nhà phát triển', 'error');
    });
  }

  handleFileExcel(evt){
    this.fileExcel = evt.target.files[0];
  }

  sendExcelFile(){
    const newData = { file : this.fileExcel};
    this.customerService.importFileExcel(newData).subscribe(
      (res) => {
        swal('Thông báo', 'Nhập file thành công', 'warning');
      },
      (error) => {
        swal('Thông báo', 'Nhập file không thành công', 'warning');
      }
    );
  }

}
