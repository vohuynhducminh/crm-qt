import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { WorkFlowInstance } from 'src/app/work-flow/models/work-flow-instance';
import { WorkFlowInstanceService } from 'src/app/work-flow/services/work-flow-instance.service';
import { environment } from 'src/environments/environment';
import { FileActionService } from 'src/app/core/services/file-action.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { WorkFlowService } from 'src/app/work-flow/services/work-flow.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-work-flow-instance-file',
  templateUrl: './work-flow-instance-file.component.html',
  styleUrls: ['./work-flow-instance-file.component.scss'],
})
export class WorkFlowInstanceFileComponent implements OnInit {

  @Input()
  set workFlowInstance(workFlowInstance: WorkFlowInstance) {
    this._workFlowInstance = workFlowInstance;
    if (this._workFlowInstance) {
      this.getTemplates();
      this.getForms();
      this.uploadUrlPath = `${environment.endPoint}${environment.apiPaths.template.post}?instanceId=${this._workFlowInstance.Id}`;
    }
  }

  _workFlowInstance: WorkFlowInstance;

  fileList: any[] = [];
  uploadUrlPath: string;
  downloadUrlPath: string;
  deleteUrlPath: string;
  modalRef: BsModalRef;
  selectedTemplate: any;
  availabledForms: any[] = [];

  constructor(
    private workFlowInstanceService: WorkFlowInstanceService,
    private workFlowService: WorkFlowService,
    private fileActionService: FileActionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.downloadUrlPath = `${environment.endPoint}${environment.apiPaths.template.get}?id=`;
    this.deleteUrlPath = `${environment.endPoint}${environment.apiPaths.template.delete}?id=`;
  }

  openModal(selected: any, template: TemplateRef<any>) {
    this.selectedTemplate = selected;
    this.modalRef = this.modalService.show(template);
  }

  getTemplates() {
    this.workFlowInstanceService.getWFInstanceTemplates(this._workFlowInstance.Id)
      .then(
        (response: any[]) => {
          this.fileList = response;
        },
        error => console.error(error)
      );
  }

  onChangeFile({ file }) {
    if (file) {
      console.log(file.response);
      this.getTemplates();
    }
  }

  onFileClick(file: any) {
    this.fileActionService.downloadFile(`${this.downloadUrlPath}${file.Id}`)
      .then(
        (fileRes) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(fileRes);
          link.download = file.Name;
          link.click();
        },
        error => console.error(error)
      );
  }

  onDeleteFile(file: any, index: number) {
    this.fileActionService.deleteFile(`${this.deleteUrlPath}${file.Id}`)
      .then(
        () => {
          this.fileList.splice(index, 1);
        },
        error => console.error(error)
      );
  }

  getForms() {
    this.workFlowService.getWorkFlowForm(this._workFlowInstance.WorkFlowId)
      .then(
        (response: any[]) => {
          this.availabledForms = response;
        },
        error => console.error(error)
      );
  }

  setTemplateForm(formId: string) {
    this.workFlowInstanceService.setTemplateForm(this.selectedTemplate.Id, formId)
      .then(
        () => {
          swal({
            title: '',
            text: 'Update successful!',
            type: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          this.modalRef.hide();
        },
        error => console.error(error)
      );
  }

}
