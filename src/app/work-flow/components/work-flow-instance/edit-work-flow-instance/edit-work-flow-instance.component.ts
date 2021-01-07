import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { WorkFlowInstance } from '../../../models/work-flow-instance';
import { WorkFlowInstanceService } from '../../../services/work-flow-instance.service';

@Component({
  selector: 'app-edit-work-flow-instance',
  templateUrl: './edit-work-flow-instance.component.html',
  styleUrls: ['./edit-work-flow-instance.component.scss'],
})
export class EditWorkFlowInstanceComponent implements OnInit {
  
  workFlowInstance: WorkFlowInstance;
  instanceType = '';
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private workFlowInstanceService: WorkFlowInstanceService
  ) { }

  ngOnInit() {
    this.workFlowInstance = { ...this.workFlowInstance };
    this.instanceType = this.workFlowInstance.Type;
  }

  updateWorkFlowInstance() {
    this.workFlowInstanceService.updateWorkFlowInstance(this.workFlowInstance)
    .then(() => {
      this.modalRef.hide();
      this.refresh.emit();
    })
    .catch(error => console.error(error));
  }

  changeSubType() {
    if (this.instanceType !== this.workFlowInstance.Type) {
      this.workFlowInstance.Type = this.instanceType;
      switch (this.instanceType) {
        case 'Activity':
          this.workFlowInstance.SubType = 'Task';
          break;
        case 'Event':
          this.workFlowInstance.SubType = 'Start event';
          break;
        case 'Gateway':
          this.workFlowInstance.SubType = 'Exclusive';
          break;
      }
    }
  }

}
