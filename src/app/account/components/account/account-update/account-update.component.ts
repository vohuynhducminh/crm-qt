import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AccountUM, AccountVM, RoleVM } from 'src/app/account/models';
import { AccountService } from 'src/app/account/services';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss'],
})
export class AccountUpdateComponent implements OnInit {
  @Input() roles: RoleVM[] = [];
  @Input() accountSelected: AccountVM;
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
      Id: [undefined],
      RoleNames: [[]],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Id').setValue(this.accountSelected.Id);
    this.form.get('RoleNames').setValue(this.accountSelected.RoleNames);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useUpdate = () => {
    // this.service.useUpdate(this.form.value as AccountUM)
    //   .then(() => {
    //     swal('Thông báo', 'Cập nhật nhân viên ' + this.accountSelected.UserName + ' thành công', 'success');
    //     this.modalRef.hide();
    //     this.useChange.emit();
    //   }).catch(() => {
    //     swal('Thông báo', 'Có lỗi xảy ra', 'error');
    //   });
  }

}
