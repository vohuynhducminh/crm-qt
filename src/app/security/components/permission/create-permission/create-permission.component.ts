import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PermissionService } from '../../../services/permission.service';
import { Permission, PermissionCM } from '../../../models/permission';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createPermission(name: string) {
    const permissionCM: PermissionCM = {
      Name: name,
    };
    this.permissionService.createPermission(permissionCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }


}
