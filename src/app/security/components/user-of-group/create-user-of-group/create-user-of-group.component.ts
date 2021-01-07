import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { Group } from 'src/app/security/models/group';
import { User } from 'src/app/security/models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupUserService } from 'src/app/security/services/group-user.service';
import { GroupUser, GroupUserVM, GroupUserCM } from 'src/app/security/models/group-user';

@Component({
  selector: 'app-create-user-of-group',
  templateUrl: './create-user-of-group.component.html',
  styleUrls: ['./create-user-of-group.component.scss'],
})
export class CreateUserOfGroupComponent implements OnInit, OnChanges {

  @Input() group: Group;
  @Input()
  set userList(userList: User[]) {
    if (userList) { this._userList = [...userList]; }
  }

  @Input()
  set addedUserList(addedUserList: GroupUserVM[]) {
    if (addedUserList) { this._addedUserList = [...addedUserList]; }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedUserList: GroupUserVM[];
  _userList: User[];
  _filteredUserList: User[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private groupUserService: GroupUserService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._userList && this._addedUserList) {
      const tmp: User[] = this._addedUserList.map(
        ad => this._userList.find(u => u.Id === ad.User.Id)
      );
      this._filteredUserList = this._userList.filter(
        u => tmp.indexOf(u) < 0
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createUserOfGroup(userIdList: string[]) {
    const groupUserList: GroupUserCM[] = userIdList.map(e => ({
      GroupId: this.group.Id,
      UserId: e,
    }));
    this.groupUserService.createGroupUser(groupUserList)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
