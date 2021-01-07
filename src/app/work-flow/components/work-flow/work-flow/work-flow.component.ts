import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EditWorkFlowComponent } from '../edit-work-flow/edit-work-flow.component';
import { WorkFlow } from '../../../models/work-flow';
import { WorkFlowService } from '../../../services/work-flow.service';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss'],
})
export class WorkFlowComponent implements OnInit, OnChanges {

  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  data: WorkFlow[] = [];
  filteredData: WorkFlow[] = [];
  editing = {};
  selecting: WorkFlow;
  deleting: WorkFlow;
  modalRef: BsModalRef;

  constructor(
    private workFlowService: WorkFlowService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
    this.filteredData = this.data;
  }

  getData() {
    this.workFlowService.getWorkFlowList()
      .then((response: WorkFlow[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch((error) => { console.error(error); });
  }

  openUpdateModal(workFlow: WorkFlow) {
    this.modalRef = this.modalService.show(EditWorkFlowComponent, { initialState: { workFlow }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
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

  deleteWorkFlow(workFlow: WorkFlow) {
    this.deleting = workFlow;
    this.workFlowService.deleteWorkFlow(workFlow)
      .then(() => {
        this.getData();
        this.selecting = null;
      })
      .catch((error) => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

  selectCheck(event) {
    return event !== this.deleting;
  }

}
