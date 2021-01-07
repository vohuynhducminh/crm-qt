import { Component, OnInit, EventEmitter, Input, OnChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { WorkFlowConnection } from '../../../models/work-flow-connection';
import { WorkFlowConnectionService } from '../../../services/work-flow-connection.service';
import { WorkFlowInstance } from '../../../models/work-flow-instance';

@Component({
  selector: 'app-edit-work-flow-connection',
  templateUrl: './edit-work-flow-connection.component.html',
  styleUrls: ['./edit-work-flow-connection.component.scss'],
})
export class EditWorkFlowConnectionComponent implements OnInit {

  workFlowConnection: WorkFlowConnection;
  workFlowInstance: WorkFlowInstance;
  workFlowInstanceList: WorkFlowInstance[];
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private workFlowConnectionService: WorkFlowConnectionService
  ) { }

  ngOnInit() {
    this.workFlowConnection = { ...this.workFlowConnection };
    this.workFlowInstanceList = this.workFlowInstanceList
      .filter(wfi => wfi.Id !== this.workFlowInstance.Id);
  }

  updateWorkFlowConnection() {
    this.workFlowConnectionService.updateWorkFlowConnection(this.workFlowConnection)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
