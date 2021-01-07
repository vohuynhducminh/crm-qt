import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TemplateService } from 'src/app/template/services/template.service';
import { WorkFlowInstanceVM } from 'src/app/template/models/template-model';
// import { UploadFile } from 'src/app/@pages/components/upload/interface';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
})
export class CreateTemplateComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  modalRef: BsModalRef;
  validateCreateTemplate: FormGroup;
  workflowinstanceVM: WorkFlowInstanceVM[];
  disableUpload = false;
  fileUL = new FormData();
  errorFormCM = '';
  constructor(
    private modalService: BsModalService,
    private templateService: TemplateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getWorkFlowInstance();
    this.registerCreateTemplate();
  }

  handleChange({fileList}) {
    if (fileList.length === 0) {
      this.disableUpload = false;
    } else {
      const file = fileList[0].originFileObj;
      this.fileUL.append('file', file, file.name);
      this.disableUpload = true;
    }
  }

  getWorkFlowInstance() {
    this.templateService.getWorkFlowInstance()
    .then(
      value => {
        this.workflowinstanceVM = value;
        console.log(value);
      }
    )
    .catch(error => console.error(error));
  }

  registerCreateTemplate() {
    // const formGroupField = this.createFormGroupField();
    this.validateCreateTemplate = this.formBuilder.group(
      {
        InstanceId: ['', Validators.required],
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // , { class: 'modal-kd' }
  }

  resetForm() {
    this.registerCreateTemplate();
    this.errorFormCM = '';
    this.fileUL = new FormData();
    this.disableUpload = false;
  }

  uploadTemplate() {
    if (this.validateCreateTemplate.valid) {
      this.templateService.createTemplate(this.fileUL, this.validateCreateTemplate.value.InstanceId)
        .then(
          value => {
            console.log(value);
            this.modalRef.hide();
            this.refresh.emit();
          }
        )
        .then(() => {
          setTimeout(
            () => {
              this.resetForm();
            },
            3000
          );
        })
        .catch(
          error => console.error(error)
        );
    } else {
      this.errorFormCM = 'Please do all required!';
    }
  }
}
