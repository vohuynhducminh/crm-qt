import { Component, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BasicService } from 'src/app/service/services';
import { CommonServiceVM, CommonServiceCM, CommonServiceUM } from 'src/app/service/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-common-service',
  templateUrl: './create-common-service.component.html',
  styleUrls: ['./create-common-service.component.scss'],
})
export class CreateCommonServiceComponent implements OnInit {
  @Output() useChange: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: BasicService<CommonServiceVM, CommonServiceCM, CommonServiceUM>,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Name: [undefined, Validators.required],
      Type: [0, Validators.required],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Name').setValue(undefined);
    this.form.get('Name').setErrors(undefined);
    this.form.get('Type').setValue(0);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useCreate = () => {
    this.service.useCreate('common_telecom_service', this.form.value as CommonServiceCM)
      .then(() => {
        swal('Thông báo', 'Thêm dịch vụ ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch(() => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
