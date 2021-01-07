import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { BsModalRef } from 'ngx-bootstrap';
import { WorkFlowService } from 'src/app/work-flow/services/work-flow.service';

@Component({
  selector: 'app-work-flow-cus',
  templateUrl: './work-flow-cus.component.html',
  styleUrls: ['./work-flow-cus.component.scss'],
})
export class WorkFlowCusComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  data: WorkFlow[] = [];
  filteredData: WorkFlow[] = [];
  selecting: WorkFlow;
  modalRef: BsModalRef;

  constructor(
    private workFlowService: WorkFlowService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.workFlowService.getWorkFlowList()
      .then((response: WorkFlow[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch(error => console.error(error));
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

  resetSelecting(): void {
    this.selecting = null;
  }

}
