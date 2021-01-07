import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-create-contract-vt',
  templateUrl: './create-contract-vt.component.html',
  styleUrls: ['./create-contract-vt.component.scss'],
})
export class CreateContractVtComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

}
