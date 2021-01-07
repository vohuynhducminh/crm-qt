import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'src/app/account/services';
import { RoleCM } from 'src/app/account/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit {
  @Output() useChange: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: RoleService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Name: [undefined, Validators.required],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Name').setValue(undefined);
    this.form.get('Name').setErrors(undefined);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useCreate = () => {
    this.service.useCreate(this.form.value as RoleCM)
      .then(() => {
        swal('Thông báo', 'Thêm quyền ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch((err) => {
        if (err.status && err.status === 400) {
          if (err.error[0].Code && err.error[0].Code === 'DuplicateRoleName') {
            swal('Thông báo', 'Thông tin được thêm đã có trong hệ thống. Vui lòng nhập thông tin khác', 'error');
          } else {
            swal('Thông báo', 'Có lỗi xảy ra', 'error');
          }
        } else {
          swal('Thông báo', 'Có lỗi xảy ra', 'error');
        }
      });
  }

}
