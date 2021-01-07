import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerWorkFlowService } from '../../services/customer-work-flow.service';
import { CustomerWorkFlow } from '../../models/customer-work-flow';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Customer } from 'src/app/customer/models/customer';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
})
export class ProcessPageComponent implements OnInit, OnDestroy {
  customerWorkFlowId: string;

  customerWorkFlow: CustomerWorkFlow;
  private sub: Subscription;
  cus: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public customerWorkFlowService: CustomerWorkFlowService,
    private customerService: CustomerService,
    private authService: AuthGuardService
  ) {
    if (!this.authService.checkAccess(['workflow', 'process', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.customerWorkFlowId = params['id'];
        if (this.customerWorkFlowId) {
          this.getCustomerWorkFlow();
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }

  getCustomerWorkFlow() {
    this.customerWorkFlowService.getCustomerWorkFlow(this.customerWorkFlowId)
      .then(
        (response: CustomerWorkFlow) => {
          this.customerWorkFlow = response;
          if (!this.customerWorkFlow.CustomerId.includes('00000000-0000-0000-0000-000000000000')) {
            this.customerService.getCustomerById(this.customerWorkFlow.CustomerId)
              .then(
                (customerInWF: Customer) => {
                  this.customerWorkFlowService.customerInWorkFlow = customerInWF;
                  this.cus = customerInWF;
                }
              );
          }
        },
        error => console.error(error)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete() {
    swal({
      title: 'Quyết định xóa?',
      text: 'Sau khi xóa sẽ mất hoàn toàn!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.customerWorkFlowService.delete(this.customerWorkFlowId).then(() => {
          swal('Thông báo', 'Xóa tiến trình thành công', 'success');
          this.router.navigateByUrl('work-flow-customer');
        }).catch((err) => {
          swal('Thông báo', 'Xóa tiến trình thất bại', 'success');
        });
      }
    });
  }

}
