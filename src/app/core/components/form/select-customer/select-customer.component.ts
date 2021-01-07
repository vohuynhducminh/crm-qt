import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';
import { PagingVM, Customer } from 'src/app/customer/models/customer';

@Component({
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  modalRef: BsModalRef;

  state = {
    load: false,
    disabledTransition: false,
    data: [],
    selected: [],
    selectingAll: false,
    index: 1,
    left: 1,
    right: 1,
    total: 0,
  };

  searchData = {
    name: '',
    address: '',
    index: 1,
    pageSize: 10,
  };

  timeOutCount: any;
  timeOutDelay = 500;

  constructor(
    private modalService: BsModalService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.loadCustomersPagingByNameAndAddress();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-kd-lg' });
  }

  setPage(pageInfo: any) {
    this.searchData.index = pageInfo.offset + 1;
    this.loadCustomersPagingByNameAndAddress();
    this.state.selectingAll = false;
  }

  loadTimeOut() {
    this.state.load = true;
    this.searchData.index = 1;
    clearTimeout(this.timeOutCount);
    this.timeOutCount = setTimeout(() => this.loadCustomersPagingByNameAndAddress(), this.timeOutDelay);
  }

  loadCustomersPagingByNameAndAddress() {
    this.state.disabledTransition = true;
    if ((this.field.FieldType && !this.field.FieldType.includes('write')) || !this.field.IsCurrent) {
      const customerIdList: string[] = this.group.controls[this.field.Name].value;
      if (customerIdList && customerIdList.length > 0) {
        this.customerService.getCustomersByListId(customerIdList)
          .then(
            (response: Customer[]) => {
              this.state.data = response;
            },
            error => console.error(error)
          );
      }
    } else {
      this.customerService.getCustomersPagingByNameAndAddress(
        this.searchData.name,
        this.searchData.address,
        this.searchData.index,
        this.searchData.pageSize
      ).then(
        (response: PagingVM) => {
          if (response) {
            this.state.data = response.List;
            this.state.index = response.Index - 1;
            this.state.left = response.Left;
            this.state.right = response.Right;
            this.state.total = response.Total;
          }
          this.state.load = false;
          setTimeout(() => {
            this.state.disabledTransition = false;
          }, 50);
        },
        error => console.error(error)
      );
    }
  }

  selectAllPage() {
    this.state.selectingAll = !this.state.selectingAll;
    let customerIdList: string[] = this.group.controls[this.field.Name].value;
    if (!customerIdList) {
      customerIdList = [];
    }
    if (this.state.selectingAll) {
      if (this.state.data) {
        this.state.data.forEach(e => {
          const index = customerIdList.indexOf(e.Id);
          if (index === -1) {
            customerIdList.push(e.Id);
          }
        });
      }
    } else {
      this.state.data.forEach(e => {
        const index = customerIdList.indexOf(e.Id);
        if (index !== -1) {
          customerIdList.splice(index, 1);
        }
      });
    }
    this.group.controls[this.field.Name].setValue(customerIdList);
  }

  selectRow({ selected }) {
    if (selected && selected[0]) {
      this.select(selected[0].Id);
    }
  }

  select(id: string) {
    let customerIdList: string[] = this.group.controls[this.field.Name].value;
    if (!customerIdList) {
      customerIdList = [];
    }
    const index = customerIdList.indexOf(id);
    if (index !== -1) {
      customerIdList.splice(index, 1);
    } else {
      customerIdList.push(id);
    }
    this.group.controls[this.field.Name].setValue(customerIdList);
    this.state.selectingAll = false;
  }

}
