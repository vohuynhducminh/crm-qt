import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer, PagingVM } from 'src/app/customer/models/customer';

@Component({
  templateUrl: './select-individual.component.html',
  styleUrls: ['./select-individual.component.scss'],
})
export class SelectIndividualComponent implements OnInit {
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
    total: 0,
  };

  searchData = {
    name: '',
    position: '',
    customer: '',
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
        this.customerService.getCustomerContactsByListId(customerIdList)
          .then(
            (response: any[]) => {
              this.state.data = response;
            },
            error => console.error(error)
          );
      }
    } else {
      this.customerService.getCustomerContactsPagingByNamePosCus(
        this.searchData.name,
        this.searchData.position,
        this.searchData.customer,
        this.searchData.index,
        this.searchData.pageSize
      ).then(
        (response: PagingVM) => {
          if (response) {
            this.state.data = response.List;
            this.state.index = response.Index - 1;
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
