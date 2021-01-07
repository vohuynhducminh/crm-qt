import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Permission } from '../../../models/permission';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss'],
})
export class EditPermissionComponent implements OnInit {

  permission: Permission;
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
  }

  updatePermission() {
    this.permissionService.updatePermission(this.permission)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
