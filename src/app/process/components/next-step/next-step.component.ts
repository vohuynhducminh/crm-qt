import { Component, OnInit, TemplateRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RouteService } from 'src/app/process/services/route.service';
import { Route, RouteCM } from 'src/app/process/models/route';
import { HistoryService } from 'src/app/process/services/history.service';
import { WorkspaceFormComponent } from '../workspace-form/workspace-form.component';

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss'],
})
export class NextStepComponent implements OnInit {
  @ViewChild('command') command: any;
  @Input() customerWorkFlowId: string;
  @Input()
  set currentInstanceId(currentInstanceId: string) {
    if (currentInstanceId) {
      this._currentInstanceId = currentInstanceId;
      this.getData();
    } else {
      this.routeResponse = null;
      this.showFile = !!this.routeResponse;
    }
  }
  @Input() workspace: WorkspaceFormComponent;
  @Input() currentProcessId: string;

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalTitle: string;
  isExclusive: boolean;
  routeResponse: Route;
  modalRef: BsModalRef;
  _currentInstanceId: string;
  comment: string;
  showFile = false;

  disableSubmit = true;

  constructor(
    private modalService: BsModalService,
    private routeService: RouteService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  getData() {
    if (this._currentInstanceId) {
      this.routeService.getRoute(this._currentInstanceId, this.customerWorkFlowId)
        .then(
          (response: Route) => {
            this.routeResponse = response;
            this.isExclusive = false;
            this.showFile = !!this.routeResponse;
            if (this.routeResponse) {
              if (this.routeResponse.CurrentSubType === 'Exclusive') {
                this.disableSubmit = false;
                this.modalTitle = this.routeResponse.Name;
                this.isExclusive = true;
              } else {
                if (this.routeResponse.CurrentSubType === 'Task' && this.routeResponse.SubType === 'Exclusive') {
                  this.routeService.getRoute(this.routeResponse.Id, this.customerWorkFlowId)
                    .then(
                      (response2: Route) => {
                        this.routeResponse = response2;
                        this.disableSubmit = false;
                        this.modalTitle = this.routeResponse.Name;
                        this.isExclusive = true;
                      },
                      error => console.error(error)
                    );
                } else {
                  this.disableSubmit = false;
                  this.modalTitle = 'Bước kế tiếp';
                }
              }
            }
          },
          error => {
            this.routeResponse = null;
            console.error(error);
          }
        );
    }
  }

  createRoute(nextInstanceId: string) {
    if (this.workspace && this.workspace.dynamicForm && this.workspace.dynamicForm.form) {
      this.historyService.createForm(this.currentProcessId, this.workspace.dynamicForm.value)
        .then(
          () => {
            const routeCM: RouteCM = {
              CurrentInstanceId: this._currentInstanceId,
              NextInstanceId: nextInstanceId,
              CustomerWorkFlowId: this.customerWorkFlowId,
            };
            this.routeService.createRoute(routeCM)
              .then(
                () => {
                  this.modalService.hide(1);
                  this.refresh.emit();
                },
                (error) => {
                  console.error(error);
                  this.disableSubmit = false;
                }
              );
          },
          (error) => {
            console.error(error);
            this.disableSubmit = false;
          }
        );
    } else {
      const routeCM: RouteCM = {
        CurrentInstanceId: this._currentInstanceId,
        NextInstanceId: nextInstanceId,
        CustomerWorkFlowId: this.customerWorkFlowId,
        Comment: this.comment,
      };
      this.routeService.createRoute(routeCM)
        .then(
          () => {
            this.modalService.hide(1);
            this.refresh.emit();
          },
          (error) => {
            console.error(error);
            this.disableSubmit = false;
          }
        );
    }
  }

  disableSubmitForm(value: string) {
    this.disableSubmit = true;
    this.createRoute(value);
  }

}
