import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CustomerWorkFlowService } from 'src/app/customer/services/customer-work-flow.service';
import { CustomerWorkFlow } from 'src/app/customer/models/customer-work-flow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss'],
})
export class ProcessTableComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  data: CustomerWorkFlow[] = [];
  filteredData: CustomerWorkFlow[] = [];

  constructor(
    private customerWorkFlowService: CustomerWorkFlowService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.customerWorkFlowService.getCustomerWorkFlowList()
      .then(
        (response: CustomerWorkFlow[]) => {
          this.data = response;
          this.filteredData = this.data;
        }
      );
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.Customer.Name.toLowerCase().indexOf(searchValue) !== -1
        || d.WorkFlow.Name.toLowerCase().indexOf(searchValue) !== -1
        || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    if (selected) {
      this.router.navigate(['process', selected[0].Id]);
    }
  }

}
