import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkFlowInstanceService } from '../../services/work-flow-instance.service';
import { WorkFlowInstance } from '../../models/work-flow-instance';
import { WorkFlowService } from '../../services/work-flow.service';
import { WorkFlow } from '../../models/work-flow';
import { WorkFlowInstanceFormService } from '../../services/work-flow-instance-form.service';
import { Form } from 'src/app/core/models/form';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-work-flow-instance-config-page',
  templateUrl: './work-flow-instance-config-page.component.html',
  styleUrls: ['./work-flow-instance-config-page.component.scss'],
})
export class WorkFlowInstanceConfigPageComponent implements OnInit, OnDestroy {
  workFlowInstanceId: string;
  workFlowInstance: WorkFlowInstance;
  workFlow: WorkFlow;
  instanceForm: Form;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workFlowInstanceService: WorkFlowInstanceService,
    private workFlowInstanceFormService: WorkFlowInstanceFormService,
    private workFlowService: WorkFlowService,
    private authService: AuthGuardService
  ) {
    if (!this.authService.checkAccess(['workflow', 'setting', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.workFlowInstanceId = params['id'];
        if (this.workFlowInstanceId) {
          this.getWorkFlowInstance();
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }

  getWorkFlowInstance() {
    this.workFlowInstanceService.getWorkFlowInstance(this.workFlowInstanceId)
      .then(
        (response: WorkFlowInstance) => {
          this.workFlowInstance = response;
          if (this.workFlowInstance.WorkFlowId) {
            this.workFlowService.getWorkFlow(this.workFlowInstance.WorkFlowId)
              .then(
                (res: WorkFlow) => {
                  this.workFlow = res;
                },
                err => console.error(err)
              );
          }
          if (this.workFlowInstance.FormId) {
            this.workFlowInstanceFormService.getFormById(this.workFlowInstance.FormId)
              .then(
                (res: Form) => {
                  this.instanceForm = res;
                },
                err => console.error(err)
              );
          }
        },
        error => console.error(error)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
