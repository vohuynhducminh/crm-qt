import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Customer } from 'src/app/customer/models/customer';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomerWorkFlowService } from 'src/app/customer/services/customer-work-flow.service';
import { CustomerWorkFlowCM } from 'src/app/customer/models/customer-work-flow';

@Component({
  selector: 'app-create-customer-work-flow',
  templateUrl: './create-customer-work-flow.component.html',
  styleUrls: ['./create-customer-work-flow.component.scss'],
})
export class CreateCustomerWorkFlowComponent implements OnInit {

  @Input() customer: Customer;

  @Input()
  set workFlowList(workFlowList: WorkFlow[]) {
    if (workFlowList) {
      this._workFlowList = workFlowList;
    }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _workFlowList: WorkFlow[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private customerWorkFlowService: CustomerWorkFlowService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createCustomerWorkFlow(workFlowId: string) {
    const customerWorkFlowCM: CustomerWorkFlowCM = {
      CustomerId: this.customer.Id,
      WorkFlowId: workFlowId,
    };
    this.customerWorkFlowService.createCustomerWorkFlow(customerWorkFlowCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
