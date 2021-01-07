import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EditWorkFlowInstanceComponent } from '../edit-work-flow-instance/edit-work-flow-instance.component';
import { WorkFlow } from '../../../models/work-flow';
import { WorkFlowInstanceService } from '../../../services/work-flow-instance.service';
import { WorkFlowInstance } from '../../../models/work-flow-instance';

@Component({
  selector: 'app-work-flow-instance',
  templateUrl: './work-flow-instance.component.html',
  styleUrls: ['./work-flow-instance.component.scss'],
})
export class WorkFlowInstanceComponent implements OnInit, OnChanges {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() workFlow: WorkFlow;

  modalRef: BsModalRef;
  data: WorkFlowInstance[] = [];
  filteredData: WorkFlowInstance[] = [];
  editInstanceName = {};
  editInstanceSubtype = {};
  selecting: WorkFlowInstance;
  deleting: WorkFlowInstance;

  constructor(
    private workFlowInstanceService: WorkFlowInstanceService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.data = [];
    this.selecting = null;
    if (this.workFlow) {
      this.workFlowInstanceService.getWorkFlowInstanceList(this.workFlow.Id)
        .then((response: WorkFlowInstance[]) => {
          this.data = response;
          this.filteredData = response;
        })
        .catch(error => console.error(error));
    }
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.Name.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
  }

  openUpdateModal(workFlowInstance: WorkFlowInstance) {
    this.modalRef = this.modalService.show(EditWorkFlowInstanceComponent, { initialState: { workFlowInstance }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteWorkFlowInstance(workFlowInstance: WorkFlowInstance) {
    this.deleting = workFlowInstance;
    this.workFlowInstanceService.deleteWorkFlowInstance(workFlowInstance)
      .then(() => {
        this.getData();
        this.selecting = null;
      })
      .catch((error) => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }
}
