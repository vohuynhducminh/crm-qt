import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WorkFlow } from '../../../models/work-flow';
import { WorkFlowService } from '../../../services/work-flow.service';

@Component({
  selector: 'app-edit-work-flow',
  templateUrl: './edit-work-flow.component.html',
  styleUrls: ['./edit-work-flow.component.scss'],
})
export class EditWorkFlowComponent implements OnInit {
  workFlow: WorkFlow;
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private workFlowService: WorkFlowService
  ) { }

  ngOnInit() {
    this.workFlow = { ...this.workFlow };
  }

  updateWorkFlow() {
    this.workFlowService.updateWorkFlow(this.workFlow)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
