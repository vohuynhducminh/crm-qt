import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { Customer } from 'src/app/customer/models/customer';
import { Router } from '@angular/router';
import { WorkFlowCustomer } from 'src/app/work-flow-customer/models/work-flow-customer';
import { WorkFlowCustomerService } from 'src/app/work-flow-customer/services/work-flow-customer.service';
import { CustomerService } from 'src/app/customer/services/customer.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-flow-customer',
  templateUrl: './work-flow-customer.component.html',
  styleUrls: ['./work-flow-customer.component.scss'],
})
export class WorkFlowCustomerComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  @Output() closeComponent: EventEmitter<void> = new EventEmitter<void>();

  @Input() isWrite = false;
  @Input()
  set workFlow(workFlow: WorkFlow) {
    if (workFlow) {
      this._workFlow = workFlow;
      if (this.customerList) {
        this.getData();
      } else {
        this.getWorkFlow();
      }
    }
  }

  _workFlow: WorkFlow;
  customerList: Customer[];
  data: WorkFlowCustomer[] = [];
  filteredData: WorkFlowCustomer[] = [];
  // selecting: Customer;
  modalRef: BsModalRef;

  constructor(
    private workFlowCustomerService: WorkFlowCustomerService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getData() {
    this.workFlowCustomerService.getWorkFlowCustomerByWorkFlow(this._workFlow)
      .then((response: WorkFlowCustomer[]) => {
        this.data = response;
        this.filteredData = this.data;
      })
      .catch(error => console.error(error));
  }

  getWorkFlow() {
    this.customerService.getCustomer()
      .then(
        (response: Customer[]) => {
          this.customerList = response;
          this.getData();
        }
      )
      .catch(error => console.error(error));
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.CustomerName.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  close() {
    this.closeComponent.emit();
  }

  onSelect({ selected }) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      this.router.navigate(['/process', selected.Id]);
    }
  }

}
