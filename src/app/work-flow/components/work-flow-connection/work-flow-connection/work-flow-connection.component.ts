import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EditWorkFlowConnectionComponent } from '../edit-work-flow-connection/edit-work-flow-connection.component';
import { WorkFlowInstance } from '../../../models/work-flow-instance';
import { WorkFlowConnectionService } from '../../../services/work-flow-connection.service';
import { WorkFlowConnection, WorkFlowConnectionVM } from '../../../models/work-flow-connection';

@Component({
  selector: 'app-work-flow-connection',
  templateUrl: './work-flow-connection.component.html',
  styleUrls: ['./work-flow-connection.component.scss'],
})
export class WorkFlowConnectionComponent implements OnInit, OnChanges {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @Input() workFlowInstance: WorkFlowInstance;
  @Input() workFlowInstanceList: WorkFlowInstance[];

  modalRef: BsModalRef;
  data: WorkFlowConnectionVM[];

  constructor(
    private workFlowConnectionService: WorkFlowConnectionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.data = [];
    if (this.workFlowInstance) {
      this.workFlowConnectionService.getWorkFlowByFromConnection(this.workFlowInstance)
        .then((response: WorkFlowConnection[]) => {
          this.data = response.map(
            wfc => {
              const workFlowConnectionVM: WorkFlowConnectionVM = {
                Id: wfc.Id,
                Type: wfc.Type,
                Command: wfc.Command,
                FromInstance: this.workFlowInstance,
                ToInstance: this.workFlowInstanceList.find(wfi => wfi.Id === wfc.ToInstanceId),
              };
              return workFlowConnectionVM;
            }
          );
        })
        .catch(error => console.error(error));
    }
  }

  openUpdateModal(
    workFlowConnectionVM: WorkFlowConnectionVM,
    workFlowInstance: WorkFlowInstance,
    workFlowInstanceList: WorkFlowInstance[]
  ) {
    const workFlowConnection: WorkFlowConnection = {
      Id: workFlowConnectionVM.Id,
      FromInstanceId: workFlowConnectionVM.FromInstance.Id,
      ToInstanceId: workFlowConnectionVM.ToInstance.Id,
      Type: workFlowConnectionVM.Type,
      Command: workFlowConnectionVM.Command,
    };
    this.modalRef = this.modalService.show(
      EditWorkFlowConnectionComponent,
      {
        initialState: {
          workFlowConnection,
          workFlowInstance,
          workFlowInstanceList,
        },
        ignoreBackdropClick: true,
      });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteWorkFlowConnection(workFlowConnection: WorkFlowConnection) {
    this.workFlowConnectionService.deleteWorkFlowConnection(workFlowConnection)
      .then(() => {
        this.getData();
      })
      .catch((error) => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
