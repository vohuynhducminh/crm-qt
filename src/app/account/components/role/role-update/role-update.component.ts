import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { RoleVM, RoleUM } from 'src/app/account/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'src/app/account/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit {
  @Input() roleSelected: RoleVM;
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
      Id: [undefined],
      Name: [undefined, Validators.required],
    });
  }
  useOpenModal = (template: TemplateRef<any>) => {
    this.form.get('Id').setValue(this.roleSelected.Id);
    this.form.get('Name').setValue(this.roleSelected.Name);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useCreate = () => {
    this.service.useUpdate(this.form.value as RoleUM)
      .then(() => {
        swal('Thông báo', 'Cập nhật quyền ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch(() => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }

}
