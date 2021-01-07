import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorkFlow } from '../../../models/work-flow';
import { WorkFlowInstanceService } from '../../../services/work-flow-instance.service';
import { WorkFlowInstance, WorkFlowInstanceCM } from '../../../models/work-flow-instance';

@Component({
  selector: 'app-create-work-flow-instance',
  templateUrl: './create-work-flow-instance.component.html',
  styleUrls: ['./create-work-flow-instance.component.scss'],
})
export class CreateWorkFlowInstanceComponent implements OnInit {

  @Input() workFlow: WorkFlow;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private workFlowInstanceService: WorkFlowInstanceService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createWorkFlowInstance(name: string, type: string, subType: string, description: string) {
    const workFlowInstanceCM: WorkFlowInstanceCM = {
      WorkFlowId: this.workFlow.Id,
      Name: name,
      Type: type,
      SubType: subType,
      Description: description,
    };
    this.workFlowInstanceService.createWorkFlowInstance(workFlowInstanceCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch((error) => console.error(error));
  }

}
