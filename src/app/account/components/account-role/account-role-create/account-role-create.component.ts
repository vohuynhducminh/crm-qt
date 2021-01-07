import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { RoleVM, AccountVM, AccountUM } from 'src/app/account/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-account-role-create',
  templateUrl: './account-role-create.component.html',
  styleUrls: ['./account-role-create.component.scss'],
})
export class AccountRoleCreateComponent implements OnInit {
  @Input() roles: RoleVM[] = [];
  @Input() accountSelected: AccountVM;
  @Output() useChange: EventEmitter<string[]> = new EventEmitter();
  modalRef: BsModalRef;
  form: FormGroup;
  roleSelected: string[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Id: [undefined],
      RoleNames: [[]],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.roleSelected = [];
    this.roles.forEach((e) => {
      if (this.accountSelected.RoleNames.indexOf(e.Name) === -1) {
        this.roleSelected.push(e.Name);
      }
    });
    if (this.roleSelected.length === 0) {
      swal('Thông báo', 'Nhân viên này đã có đầy đủ các quyền! Không thể thêm', 'error');
    } else {
      this.form.get('Id').setValue(this.accountSelected.Id);
      this.form.get('RoleNames').setValue([]);
      this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
    }

  }

  useUpdate = () => {
    this.service.usePostRole(this.form.value as AccountUM)
      .then(() => {
        swal('Thông báo', 'Thêm quyền cho nhân viên ' + this.accountSelected.UserName + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit(this.form.value.RoleNames);
      }).catch(() => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }

}
