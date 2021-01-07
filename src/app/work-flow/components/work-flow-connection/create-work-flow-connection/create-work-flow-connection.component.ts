import { Component, OnInit, EventEmitter, Output, TemplateRef, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorkFlowInstance } from '../../../models/work-flow-instance';
import { WorkFlowConnectionService } from '../../../services/work-flow-connection.service';
import { WorkFlowConnection, WorkFlowConnectionVM, WorkFlowConnectionCM } from '../../../models/work-flow-connection';

@Component({
  selector: 'app-create-work-flow-connection',
  templateUrl: './create-work-flow-connection.component.html',
  styleUrls: ['./create-work-flow-connection.component.scss'],
})
export class CreateWorkFlowConnectionComponent implements OnInit, OnChanges {

  @Input()
  set workFlowInstance(workFlowInstance: WorkFlowInstance) {
    if (workFlowInstance) {
      this._workFlowInstance = { ...workFlowInstance };
    }
  }

  @Input()
  set workFlowInstanceList(workFlowInstanceList: WorkFlowInstance[]) {
    if (workFlowInstanceList) {
      this._workFlowInstanceList = [...workFlowInstanceList];
    }
  }

  @Input()
  set addedWorkFlowConnectionList(addedWorkFlowConnectionList: WorkFlowConnectionVM[]) {
    if (addedWorkFlowConnectionList) {
      this._addedWorkFlowConnectionList = [...addedWorkFlowConnectionList];
    }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedWorkFlowConnectionList: WorkFlowConnectionVM[];
  _workFlowInstance: WorkFlowInstance;
  _workFlowInstanceList: WorkFlowInstance[];
  _filteredWorkFlowInstanceList: WorkFlowInstance[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private workFlowConnectionService: WorkFlowConnectionService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._workFlowInstance && this._workFlowInstanceList && this._addedWorkFlowConnectionList) {
      const tmp: WorkFlowInstance[] = this._addedWorkFlowConnectionList.map(
        awfc => this._workFlowInstanceList.find(wf => wf.Id === awfc.ToInstance.Id)
      );
      this._filteredWorkFlowInstanceList = this._workFlowInstanceList.filter(
        wfi => tmp.indexOf(wfi) < 0
      );
      this._filteredWorkFlowInstanceList = this._filteredWorkFlowInstanceList
        .filter(wfi => wfi.Id !== this._workFlowInstance.Id);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createConnection(toInstanceId: string, type: string, command: string) {
    const workFlowConnectionCM: WorkFlowConnectionCM = {
      FromInstanceId: this._workFlowInstance.Id,
      ToInstanceId: toInstanceId,
      Type: type,
      Command: command,
    };
    this.workFlowConnectionService.createWorkFlowConnection(workFlowConnectionCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
