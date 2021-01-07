import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Group } from 'src/app/security/models/group';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { User } from 'src/app/security/models/user';
import { GroupUserVM, GroupUser } from 'src/app/security/models/group-user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupUserService } from 'src/app/security/services/group-user.service';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-user-of-group',
  templateUrl: './user-of-group.component.html',
  styleUrls: ['./user-of-group.component.scss'],
})
export class UserOfGroupComponent implements OnInit {

  @Input()
  set group(group: Group) {
    this._group = group;
    if (group) {
      if (this._userList) {
        this.getData();
      } else {
        this.getUserList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  _group: Group;
  _userList: User[];
  data: GroupUserVM[] = [];
  filteredData: GroupUserVM[] = [];
  modalRef: BsModalRef;

  constructor(
    private groupUserService: GroupUserService,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  getUserList() {
    this.userService.getUser()
      .then((response: User[]) => {
        this._userList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  getData() {
    this.groupUserService.getGroupUserByGroup(this._group)
      .then((response: GroupUser[]) => {
        this.data = response.map(
          gu => {
            const groupUserVM: GroupUserVM = {
              Id: gu.Id,
              Group: this._group,
              User: this._userList.find(r => r.Id === gu.UserId),
            };
            return groupUserVM;
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
      (d) => d.User.UserName.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  deleteGroupUser(groupUserVM: GroupUserVM) {
    const groupUser: GroupUser = {
      Id: groupUserVM.Id,
      GroupId: groupUserVM.Group.Id,
      UserId: groupUserVM.User.Id,
    };
    this.groupUserService.deleteGroupUser(groupUser)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
