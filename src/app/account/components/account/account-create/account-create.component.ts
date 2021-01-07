import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AccountCM } from 'src/app/account/models';
import { AccountService } from 'src/app/account/services';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  @Output() useChange: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      FirstName: [undefined, Validators.required],
      LastName: [undefined, Validators.required],
      UserName: [undefined, Validators.required],
      Password: [undefined, [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: [undefined, Validators.required],
    });
    this.form.valueChanges.subscribe((data) => {
      if (data.Password !== data.ConfirmPassword) {
        this.form.get('ConfirmPassword').setErrors({ notEqual: true });
        if (this.form.get('Password').touched || this.form.get('Password').dirty) {
          this.form.get('ConfirmPassword').markAsTouched();
        }
      } else {
        this.form.get('ConfirmPassword').setErrors(null);
        if (this.form.get('Password').touched || this.form.get('Password').dirty) {
          this.form.get('ConfirmPassword').markAsTouched();
        }
      }
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('FirstName').setValue(undefined);
    this.form.get('FirstName').setErrors(undefined);
    this.form.get('LastName').setValue(undefined);
    this.form.get('LastName').setErrors(undefined);
    this.form.get('UserName').setValue(undefined);
    this.form.get('UserName').setErrors(undefined);
    this.form.get('Password').setValue(undefined);
    this.form.get('Password').setErrors(undefined);
    this.form.get('ConfirmPassword').setValue(undefined);
    this.form.get('ConfirmPassword').setErrors(undefined);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useCreate = () => {
    const data = this.form.value;
    delete data.ConfirmPassword;
    this.service.useCreate(data as AccountCM)
      .then(() => {
        swal('Thông báo', 'Thêm nhân viên ' + data.UserName + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch((err) => {
        console.log(err);
        if (err.status && err.status === 400) {
          if (err.error.DuplicateUserName) {
            swal('Thông báo', 'Thông tin tài khoản được thêm đã có trong hệ thống. Vui lòng nhập thông tin tài khoản khác', 'error');
          } else {
            swal('Thông báo', 'Có lỗi xảy ra', 'error');
          }
        } else {
          swal('Thông báo', 'Có lỗi xảy ra', 'error');
        }
      });
  }

}
