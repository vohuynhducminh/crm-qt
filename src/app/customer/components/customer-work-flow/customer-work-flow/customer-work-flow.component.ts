import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap';
import { CustomerWorkFlowService } from 'src/app/customer/services/customer-work-flow.service';
import { Customer } from 'src/app/customer/models/customer';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { WorkFlowService } from 'src/app/work-flow/services/work-flow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-customer-work-flow',
  templateUrl: './customer-work-flow.component.html',
  styleUrls: ['./customer-work-flow.component.scss'],
  providers: [DatePipe],
})
export class CustomerWorkFlowComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('checkDateFailSwal') private checkDateFailSwal: SwalComponent;
  @Input() customerId: string;
  _customer: Customer;
  _customerCurrent: Customer;
  _customerFuture: Customer;
  currentTime: Date;
  futureTime: Date;
  workFlowList: WorkFlow[];
  data: WorkFlow[] = [];
  filteredData: WorkFlow[] = [];
  // selecting: Customer;
  modalRef: BsModalRef;

  constructor(
    private customerWorkFlowService: CustomerWorkFlowService,
    private customerService: CustomerService,
    private workFlowService: WorkFlowService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private authService: AuthGuardService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCustomerById(params['id']);
    });
    this.currentTime = new Date();
    this.futureTime = new Date();
    this.futureTime.setDate(new Date().getDate() + 1);
    this.getCurrentCustomer();
    this.getFutureCustomer();
  }

  getCustomerById(id: string) {
    this.customerService.getCustomerById(id)
      .then(
        (response: Customer) => {
          this._customer = response;
          if (this._customer) {
            if (this.workFlowList) {
              this.getData();
            } else {
              this.getWorkFlow();
            }
          }
        },
        error => console.error(error)
      );
  }
  getFutureCustomer() {
    this.customerService.getCustomerById(this.customerId, this.datepipe.transform(this.futureTime, 'yyyy-MM-dd'))
      .then(
        (response: Customer) => {
          this.checkDateSelect(response, 'future');
        }
      ).catch(err => {
        this._customerFuture = undefined;
      });
  }
  getCurrentCustomer() {
    this.customerService.getCustomerById(this.customerId, this.datepipe.transform(this.currentTime, 'yyyy-MM-dd'))
      .then(
        (response: Customer) => {
          this.checkDateSelect(response, 'current');
        }
      ).catch(err => {
        this._customerCurrent = undefined;
      });
  }
  getData() {
    this.customerWorkFlowService.getCustomerWorkFlowByCustomer(this._customer)
      .then((response: WorkFlow[]) => {
        this.data = response;
        this.filteredData = this.data;
      })
      .catch(error => console.error(error));
  }
  checkDateSelect(customer: Customer, type: 'future' | 'current') {
    if (type === 'future') {
      this._customerFuture = customer;
    } else {
      this._customerCurrent = customer;
    }
  }
  getWorkFlow() {
    this.getData();
    // this.workFlowService.getWorkFlowList()
    //   .then(
    //     (response: WorkFlow[]) => {
    //       this.workFlowList = response;
    //     }
    //   )
    //   .catch(error => console.error(error));
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
      if (this.authService.checkAccess(['workflow', 'process', 'show'])) {
        this.router.navigate(['/process', selected.Id]);
      }
    }
  }
}
