import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicService } from 'src/app/service/services';
import { CommonServiceVM, CommonServiceCM, CommonServiceUM } from 'src/app/service/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-common-service',
  templateUrl: './update-common-service.component.html',
  styleUrls: ['./update-common-service.component.scss'],
})
export class UpdateCommonServiceComponent implements OnInit {
  @Input() commonSelected: CommonServiceVM;
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
      Id: [undefined],
      Name: [undefined, Validators.required],
      Type: [0, Validators.required],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Id').setValue(this.commonSelected.Id);
    this.form.get('Name').setValue(this.commonSelected.Name);
    this.form.get('Name').setErrors(undefined);
    this.form.get('Type').setValue(this.commonSelected.Type);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useUpdate = () => {
    this.service.useUpdate('common_telecom_service', this.form.value as CommonServiceUM)
      .then(() => {
        swal('Thông báo', 'Cập nhật dịch vụ ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch(() => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
