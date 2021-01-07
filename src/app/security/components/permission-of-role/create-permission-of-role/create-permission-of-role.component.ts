import { Component, OnInit, Output, EventEmitter, TemplateRef, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PermissionOfRoleService } from 'src/app/security/services/permission-of-role.service';
import { PermissionOfRoleCM, PermissionOfRoleVM } from 'src/app/security/models/permission-of-role';
import { Role } from 'src/app/security/models/role';
import { Permission } from 'src/app/security/models/permission';

@Component({
  selector: 'app-create-permission-of-role',
  templateUrl: './create-permission-of-role.component.html',
  styleUrls: ['./create-permission-of-role.component.scss'],
})
export class CreatePermissionOfRoleComponent implements OnInit, OnChanges {

  @Input() role: Role;

  @Input()
  set permissionList(permissionList: Permission[]) {
    if (permissionList) {
      this._permissionList = [...permissionList];
    }
  }

  @Input()
  set addedPermissionOfRoleList(addedPermissionOfRoleList: PermissionOfRoleVM[]) {
    if (addedPermissionOfRoleList) {
      this._addedPermissionOfRoleList = [...addedPermissionOfRoleList];
    }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedPermissionOfRoleList: PermissionOfRoleVM[];
  _permissionList: Permission[];
  _filteredPermissionList: Permission[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private permissionOfRoleService: PermissionOfRoleService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._addedPermissionOfRoleList && this._permissionList) {
      const tmp: Permission[] = this._addedPermissionOfRoleList.map(
        por => this._permissionList.find(p => p.Id === por.Permission.Id)
      );
      this._filteredPermissionList = this._permissionList.filter(
        p => tmp.indexOf(p) < 0
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-lg' });
  }

  addPermissionToRole(permissionIdList: string[]) {
    const permissionOfRoleCM: PermissionOfRoleCM = {
      RoleId: this.role.Id,
      PermissionId: permissionIdList,
    };
    this.permissionOfRoleService.createPermissionOfRole(permissionOfRoleCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
