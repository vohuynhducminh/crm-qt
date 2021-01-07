import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Role } from 'src/app/security/models/role';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PermissionOfRole, PermissionOfRoleVM } from 'src/app/security/models/permission-of-role';
import { PermissionOfRoleService } from 'src/app/security/services/permission-of-role.service';
import { Permission } from 'src/app/security/models/permission';
import { PermissionService } from 'src/app/security/services/permission.service';
import { EditPermissionOfRoleComponent } from '../edit-permission-of-role/edit-permission-of-role.component';

@Component({
  selector: 'app-permission-of-role',
  templateUrl: './permission-of-role.component.html',
  styleUrls: ['./permission-of-role.component.scss'],
})
export class PermissionOfRoleComponent implements OnInit {

  @Input()
  set role(role: Role) {
    this._role = role;
    this.name = '';
    if (role) {
      if (this._permissionList) {
        this.getData();
      } else {
        this.getPermissionList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  _role: Role;
  _permissionList: Permission[];
  data: PermissionOfRoleVM[] = [];
  filteredData: PermissionOfRoleVM[] = [];
  modalRef: BsModalRef;
  name = '';

  constructor(
    private permissionOfRoleService: PermissionOfRoleService,
    private permissionService: PermissionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  getData() {
    this.permissionOfRoleService.getPermissionOfRoleList(this._role)
      .then((response: PermissionOfRole[]) => {
        this.data = response.map(por => {
          const permissionOfRole: PermissionOfRoleVM = {
            Id: por.Id,
            Role: this._role,
            Permission: this._permissionList.find(p => p.Id === por.PermissionId),
          };
          return permissionOfRole;
        });
        this.filteredData = this.data;
      })
      .catch(error => console.error(error));
  }

  getPermissionList() {
    this.permissionService.getPermission()
      .then((response: Permission[]) => {
        this._permissionList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  updateFilter() {
    this.filteredData = this.data.filter(e => e.Permission.Name.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase().includes(this.name.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase()));
  }

  openUpdateModal(permissionOfRoleVM: PermissionOfRoleVM) {
    const permissionOfRole: PermissionOfRole = {
      Id: permissionOfRoleVM.Id,
      PermissionId: permissionOfRoleVM.Permission.Id,
      RoleId: permissionOfRoleVM.Role.Id,
    };
    this.modalRef = this.modalService.show(EditPermissionOfRoleComponent, { initialState: { permissionOfRole } });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deletePermissionOfRole(permissionOfRoleVM: PermissionOfRoleVM) {
    const permissionOfRole: PermissionOfRole = {
      Id: permissionOfRoleVM.Id,
      PermissionId: permissionOfRoleVM.Permission.Id,
      RoleId: permissionOfRoleVM.Role.Id,
    };
    this.permissionOfRoleService.deletePermissionOfRole(permissionOfRole)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
