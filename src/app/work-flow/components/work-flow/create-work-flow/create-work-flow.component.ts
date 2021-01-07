import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WorkFlowService } from '../../../services/work-flow.service';
import { WorkFlowCM } from '../../../models/work-flow';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-work-flow',
  templateUrl: './create-work-flow.component.html',
  styleUrls: ['./create-work-flow.component.scss'],
})
export class CreateWorkFlowComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;
  isCreating: boolean;
  formGroup: FormGroup;
  name: string;
  description: string;

  constructor(
    private modalService: BsModalService,
    private workFlowService: WorkFlowService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
    this.isCreating = false;
  }

  createWorkFlow(name: string, code: string, description: string) {
    this.isCreating = true;
    const workFlowCM: WorkFlowCM = {
      Name: name,
      Code: code,
      Description: description,
    };
    this.workFlowService.createWorkFlow(workFlowCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
        this.isCreating = false;
      })
      .catch(error => console.error(error));
  }

}
