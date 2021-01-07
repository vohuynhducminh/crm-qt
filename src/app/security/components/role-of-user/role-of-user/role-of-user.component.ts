import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/security/models/user';
import { Role } from 'src/app/security/models/role';
import { RoleOfUserVM, RoleOfUser } from 'src/app/security/models/role-of-user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { RoleOfUserService } from 'src/app/security/services/role-of-user.service';
import { RoleService } from 'src/app/security/services/role.service';
import { EditRoleOfUserComponent } from '../edit-role-of-user/edit-role-of-user.component';

@Component({
  selector: 'app-role-of-user',
  templateUrl: './role-of-user.component.html',
  styleUrls: ['./role-of-user.component.scss'],
})
export class RoleOfUserComponent implements OnInit {

  @Input()
  set user(user: User) {
    this._user = user;
    if (user) {
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

  _user: User;
  _roleList: Role[];
  data: RoleOfUserVM[] = [] ;
  filteredData: RoleOfUserVM[] = [];
  modalRef: BsModalRef;

  constructor(
    private roleOfUserService: RoleOfUserService,
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
    this.roleOfUserService.getRoleOfUser(this._user)
      .then((response: RoleOfUser[]) => {
        this.data = response.map(
          rou => {
            const roleOfUser: RoleOfUserVM = {
              Id: rou.Id,
              User: this._user,
              Role: this._roleList.find(r => r.Id === rou.RoleId),
            };
            return roleOfUser;
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

  openUpdateModal(roleOfUser: RoleOfUser) {
    this.modalRef = this.modalService.show(EditRoleOfUserComponent, { initialState: { roleOfUser }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteRoleOfUser(roleOfUserVM: RoleOfUserVM) {
    const roleOfUser: RoleOfUser = {
      Id: roleOfUserVM.Id,
      UserId: roleOfUserVM.User.Id,
      RoleId: roleOfUserVM.Role.Id,
    };
    this.roleOfUserService.deleteRoleOfUser(roleOfUser)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
