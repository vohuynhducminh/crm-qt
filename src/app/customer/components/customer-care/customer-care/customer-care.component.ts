import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { CustomerCare } from 'src/app/customer/models/customer-care';
import { EditCustomerCareComponent } from '../edit-customer-care/edit-customer-care.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-care',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.scss'],
})
export class CustomerCareComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @Input() customerId: string;

  data = [] ;
  filteredData = [];
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.customerService.getCustomerCareHistories(this.customerId)
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
      (d) => d.Type.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  deleteCustomerCare(customerCare: CustomerCare) {
    this.customerService.deleteCustomerCareHistory(this.customerId, customerCare.Id)
      .then(
        (response) => {
          this.getData();
        },
        error => {
          this.deleteErrorSwal.show();
          console.error(error);
        }
      );
  }

  openUpdateModal(customerCare: CustomerCare) {
    this.modalRef = this.modalService.show(EditCustomerCareComponent,
    {
      initialState: {
        customerId: this.customerId,
        _customerCare: customerCare,
      },
      ignoreBackdropClick: true,
    });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }
  checkAccess = (group: string, attribute: string): boolean => {
    const access_roles = environment.access_roles; // Bên environtment
    const { roles } = JSON.parse(localStorage.getItem("CRM_TOKEN")); // token
    const canActive: string[] = [];
    for (let index = 0; index < access_roles.length; index++) {
      const access_role = access_roles[index];
      if (roles.indexOf(access_role.name) > -1) {
        const obj = access_role.data[group]; // dashboard
        const check = obj[attribute]; // showCVPMQT
        if (check) {
          canActive.push(attribute);
        }
      }
    }

    return canActive.length > 0;
  };

}
