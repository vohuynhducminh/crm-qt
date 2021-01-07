import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CustomerContactVM } from 'src/app/customer/models/customer-contact';
import { CustomerContactService } from 'src/app/customer/services/customer-contact.service';

@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrls: ['./customer-contact.component.scss'],
})
export class CustomerContactComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() customerId: string;

  data = [] ;
  filteredData = [];
  selecting: CustomerContactVM;
  previousSelecting: CustomerContactVM;
  constructor(
    private customerContactService: CustomerContactService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.customerContactService.getCustomerContactByCustomer(this.customerId)
    .then(
      data => {
        this.filteredData = data;
        this.data = data;
      }
    )
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

  refreshEditView() {
    this.getData();
    this.selecting = null;
  }

  onSelect({ selected }) {
    if (selected) {
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
        this.previousSelecting = selected;
      }
    }
    // this.formService.getFormFormGroupById(this.selecting.Id)
    // .then(
    //   form => {
    //     this.formResponse = form;
    //   }
    // )
    // .catch(e => console.log(e));
  }
}
