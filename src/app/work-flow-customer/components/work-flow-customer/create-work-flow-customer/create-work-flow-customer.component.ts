import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { Customer } from 'src/app/customer/models/customer';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorkFlowCustomerService } from 'src/app/work-flow-customer/services/work-flow-customer.service';
import { CustomerWorkFlowCM } from 'src/app/customer/models/customer-work-flow';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-create-work-flow-customer',
  templateUrl: './create-work-flow-customer.component.html',
  styleUrls: ['./create-work-flow-customer.component.scss'],
})
export class CreateWorkFlowCustomerComponent implements OnInit {
  @ViewChild('createWorkFlowCustomerSuccessSwal') private createWorkFlowCustomerSuccessSwal: SwalComponent;
  @ViewChild('createWorkFlowCustomerErrorSwal') private createWorkFlowCustomerErrorSwal: SwalComponent;
  @ViewChild('availableWorkFlowCustomerWarningSwal') private availableWorkFlowCustomerWarningSwal: SwalComponent;

  @Input() workFlow: WorkFlow;
  @Input() isWrite = false;

  @Input()
  set customerList(customerList: Customer[]) {
    if (customerList) {
      this._customerList = customerList;
    }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _customerList: Customer[];
  isNotFound = false;
  modalRef: BsModalRef;
  customerInitName: string;

  selectedCustomer: string;

  disableSubmit = false;

  constructor(
    private modalService: BsModalService,
    private workFlowCustomerService: WorkFlowCustomerService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.disableSubmit = false;
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-lg' });
  }

  createWorkFlowCustomer(customerId: string, isChecked: boolean, callback = () => console.log()) {
    let customerWorkFlowCM: any;
    if (!customerId) {
      isChecked = true;
      customerWorkFlowCM = {
        WorkFlowId: this.workFlow.Id,
      };
    } else {
      customerWorkFlowCM = {
        CustomerId: customerId,
        WorkFlowId: this.workFlow.Id,
      };
    }
    if (isChecked) {
      this.workFlowCustomerService.createWorkFlowCustomer(customerWorkFlowCM)
        .then(
          () => {
            this.modalRef.hide();
            if (callback) {
              callback();
            }
            this.refresh.emit();
            this.createWorkFlowCustomerSuccessSwal.show();
          },
          error => {
            console.error(error);
            this.createWorkFlowCustomerErrorSwal.show();
          }
        );
    } else {
      this.workFlowCustomerService.isInWorkflow(customerWorkFlowCM)
        .then(
          (response: any) => {
            if (response.result) {
              this.availableWorkFlowCustomerWarningSwal.show();
            } else {
              this.workFlowCustomerService.createWorkFlowCustomer(customerWorkFlowCM)
                .then(
                  () => {
                    this.modalRef.hide();
                    callback();
                    this.createWorkFlowCustomerSuccessSwal.show()
                    .then(() => this.refresh.emit());
                  },
                  error => {
                    console.error(error);
                    this.createWorkFlowCustomerErrorSwal.show();
                  }
                );
            }
          },
          error => console.error(error)
        );
    }
  }

  disableSubmitForm() {
    this.disableSubmit = true;
    this.createWorkFlowCustomer(this.selectedCustomer, false);
  }

  searchHandler(searchValue: string) {
    this.isNotFound = this._customerList.filter(u => u.Name.indexOf(searchValue.trim()) > -1).length === 0;
    this.customerInitName = this.isNotFound ? searchValue : null;
  }

  updateCustomerInitName() {
    if (this.selectedCustomer && !this.selectedCustomer.startsWith('create:')) {
      this.customerInitName = null;
    }
  }

  afterCreateCustomerSuccess(event: string) {
    this.createWorkFlowCustomer(
      event,
      true,
      () => {
        this.customerService.getCustomer()
          .then(
            (response: Customer[]) => {
              this._customerList = response;
              this.isNotFound = false;
              this.customerInitName = null;
            },
            error => console.error(error)
          );
      }
    );
  }

}
