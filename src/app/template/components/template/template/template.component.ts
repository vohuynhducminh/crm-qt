import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/template/services/template.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { TemplateVM } from 'src/app/template/models/template-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { EditTemplateComponent } from '../edit-template/edit-template.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  workFlowInstance: any;
  selecting: TemplateVM;
  modalRef: BsModalRef;
  workFlowInstanceId = '3930b7de-8b07-40cf-a73d-08d6a4384626';
  constructor(
    private templateService: TemplateService,
    private modalService: BsModalService
  ) { }
  templatesVM: TemplateVM[];
  ngOnInit() {
    this.onWorkFlowChange('3930b7de-8b07-40cf-a73d-08d6a4384626');
    this.getWorkFlowInstance();
  }

  getTemplates(idWorkFlowInstance: string) {
    this.templateService.getTemplate(idWorkFlowInstance)
    .then(
      templatesVM => {
        this.templatesVM = templatesVM;
      }
    )
    .catch(
      error => console.error(error)
    );
  }

  onSelect({ selected }) {
    if (selected) {
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
    console.log(this.selecting);
    // this.formService.getFormFormGroupById (this.selecting.Id)
    // .then(
    //   form => {
    //     console.log(form);
    //     this.formResponse = form;
    //   }
    // )
    // .catch(e => console.log(e));
  }

  deleteTemplate(row: TemplateVM) {
    this.templateService.deleteTemplate(row.Id)
    .then(value => {
      console.log(value);
      // this.getTemplates();
    })
    .catch(error => console.error(error));
  }
  onWorkFlowChange(event) {
    this.getTemplates(event);
  }

  openUpdateModal(template: TemplateVM) {
    this.modalRef = this.modalService.show(
      EditTemplateComponent,
      { initialState: { template }, class: 'modal-kd', ignoreBackdropClick: true }
    );
    // this.modalRef.content.refresh.subscribe(() => {
    //   this.onWorkFlowChange('3930b7de-8b07-40cf-a73d-08d6a4384626');
    // });
  }
  getWorkFlowInstance() {
    this.templateService.getWorkFlowInstance()
    .then(
      data => this.workFlowInstance = data,
      error => console.error(error)
    );
  }
}
