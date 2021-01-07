import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { RoleOfGroupService } from 'src/app/security/services/role-of-group.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleOfGroupVM, RoleOfGroup } from 'src/app/security/models/role-of-group';
import { Group } from 'src/app/security/models/group';
import { Role } from 'src/app/security/models/role';
import { EditRoleOfGroupComponent } from '../edit-role-of-group/edit-role-of-group.component';
import { RoleService } from 'src/app/security/services/role.service';

@Component({
  selector: 'app-role-of-group',
  templateUrl: './role-of-group.component.html',
  styleUrls: ['./role-of-group.component.scss'],
})
export class RoleOfGroupComponent implements OnInit {

  @Input()
  set group(group: Group) {
    this._group = group;
    if (group) {
      if (this._roleList) {
        this.getData();
      } else {
        this.getRoleList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  _group: Group;
  _roleList: Role[];
  data: RoleOfGroupVM[] = [] ;
  filteredData: RoleOfGroupVM[] = [];
  modalRef: BsModalRef;

  constructor(
    private roleOfGroupService: RoleOfGroupService,
    private roleService: RoleService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  getRoleList() {
    this.roleService.getRole()
      .then((response: Role[]) => {
        this._roleList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  getData() {
    this.roleOfGroupService.getRoleOfGroup(this._group)
      .then((response: RoleOfGroup[]) => {
        this.data = response.map(
          rog => {
            const roleOfGroup: RoleOfGroupVM = {
              Id: rog.Id,
              Group: this._group,
              Role: this._roleList.find(r => r.Id === rog.RoleId),
            };
            return roleOfGroup;
          }
        );
        this.filteredData = this.data;
      })
      .catch(error => console.error(error));
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.Role.Name.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openUpdateModal(roleOfGroup: RoleOfGroup) {
    this.modalRef = this.modalService.show(EditRoleOfGroupComponent, { initialState: { roleOfGroup }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteRoleOfGroup(roleOfGroupVM: RoleOfGroupVM) {
    const roleOfGroup: RoleOfGroup = {
      Id: roleOfGroupVM.Id,
      GroupId: roleOfGroupVM.Group.Id,
      RoleId: roleOfGroupVM.Role.Id,
    };
    this.roleOfGroupService.deleteRoleOfGroup(roleOfGroup)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
