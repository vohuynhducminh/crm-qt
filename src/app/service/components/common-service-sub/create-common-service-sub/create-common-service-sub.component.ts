import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicService } from 'src/app/service/services';
import { CommonServiceSubVM, CommonServiceSubCM, CommonServiceSubUM, CommonServiceVM } from 'src/app/service/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-common-service-sub',
  templateUrl: './create-common-service-sub.component.html',
  styleUrls: ['./create-common-service-sub.component.scss'],
})
export class CreateCommonServiceSubComponent implements OnInit {
  @Input() common: CommonServiceVM;
  @Input() commons: CommonServiceVM[];
  @Output() useChange: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: BasicService<CommonServiceSubVM, CommonServiceSubCM, CommonServiceSubUM>,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Name: [undefined, Validators.required],
      CommonTelecomserviceId: [undefined],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Name').setValue(undefined);
    this.form.get('Name').setErrors(undefined);
    this.form.get('CommonTelecomserviceId').setValue(this.common.Id);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useCreate = () => {
    this.service.useCreate('telecom_service', this.form.value as CommonServiceSubCM)
      .then(() => {
        swal('Thông báo', 'Thêm dịch vụ ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch(() => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }

}
