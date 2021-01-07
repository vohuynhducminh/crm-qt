import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Customer } from 'src/app/customer/models/customer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  @Input() cus: Customer;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-kd-md', ignoreBackdropClick: true });
  }
}
