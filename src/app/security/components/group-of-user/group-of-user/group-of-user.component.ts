import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { User } from 'src/app/security/models/user';
import { Group } from 'src/app/security/models/group';
import { GroupUserVM, GroupUser } from 'src/app/security/models/group-user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupUserService } from 'src/app/security/services/group-user.service';
import { GroupService } from 'src/app/security/services/group.service';

@Component({
  selector: 'app-group-of-user',
  templateUrl: './group-of-user.component.html',
  styleUrls: ['./group-of-user.component.scss'],
})
export class GroupOfUserComponent implements OnInit {

  @Input()
  set user(user: User) {
    this._user = user;
    if (user) {
      if (this._groupList) {
        this.getData();
      } else {
        this.getGroupList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  _user: User;
  _groupList: Group[];
  data: GroupUserVM[] = [];
  filteredData: GroupUserVM[] = [];
  modalRef: BsModalRef;

  constructor(
    private groupUserService: GroupUserService,
    private groupService: GroupService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  getGroupList() {
    this.groupService.getGroup()
      .then((response: Group[]) => {
        this._groupList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  getData() {
    this.groupUserService.getGroupUserByUser(this._user)
      .then((response: GroupUser[]) => {
        this.data = response.map(
          gu => {
            const groupUserVM: GroupUserVM = {
              Id: gu.Id,
              User: this._user,
              Group: this._groupList.find(r => r.Id === gu.GroupId),
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
