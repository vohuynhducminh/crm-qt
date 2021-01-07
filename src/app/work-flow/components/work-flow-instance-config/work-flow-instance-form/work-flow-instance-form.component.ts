import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from 'src/app/form/services/form.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { WorkFlowInstance } from 'src/app/work-flow/models/work-flow-instance';
import { WorkFlowService } from 'src/app/work-flow/services/work-flow.service';
import { WorkFlowInstanceService } from 'src/app/work-flow/services/work-flow-instance.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-work-flow-instance-form',
  templateUrl: './work-flow-instance-form.component.html',
  styleUrls: ['./work-flow-instance-form.component.scss'],
})
export class WorkFlowInstanceFormComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  @Input()
  set workFlowInstance(workFlowInstance: WorkFlowInstance) {
    this._workFlowInstance = workFlowInstance;
    if (this._workFlowInstance) {
      this.getData();
    }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _workFlowInstance: WorkFlowInstance;

  data: any[] = [] ;
  filteredData: any[] = [];
  selecting: any;
  formGroups: any[];

  constructor(
    private formService: FormService,
    private workFlowService: WorkFlowService,
    private workFlowInstanceService: WorkFlowInstanceService
  ) { }

  ngOnInit() {
  }

  getData() {
    this.workFlowService.getWorkFlowForm(this._workFlowInstance.WorkFlowId)
      .then(
        (response: any[]) => {
          this.data = response;
          this.filteredData = response;
        },
        error => console.error(error)
      );
  }

  updateFilter(event: any) {
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
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
    this.formService.getFormFormGroupById(this.selecting.Id)
    .then(
      (form) => {
        this.formGroups = form ? form.FormGroups : null;
      },
      error => console.error(error)
    );
  }

  setInstanceForm(formId: string) {
    this.workFlowInstanceService.setWFInstanceForm(this._workFlowInstance.Id, formId)
      .then(
        () => {
          this.refresh.emit();
          swal({
            title: '',
            text: 'Update successful!',
            type: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
        },
        error => console.error(error)
      );
  }

}
