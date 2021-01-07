import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { User } from 'src/app/security/models/user';
import { Group } from 'src/app/security/models/group';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupUserService } from 'src/app/security/services/group-user.service';
import { GroupUser, GroupUserVM, GroupUserCM } from 'src/app/security/models/group-user';

@Component({
  selector: 'app-create-group-of-user',
  templateUrl: './create-group-of-user.component.html',
  styleUrls: ['./create-group-of-user.component.scss'],
})
export class CreateGroupOfUserComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input()
  set groupList(groupList: Group[]) {
    if (groupList) { this._groupList = [...groupList]; }
  }

  @Input()
  set addedGroupList(addedGroupList: GroupUserVM[]) {
    if (addedGroupList) { this._addedGroupList = [...addedGroupList]; }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedGroupList: GroupUserVM[];
  _groupList: Group[];
  _filteredGroupList: Group[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private groupUserService: GroupUserService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._groupList && this._addedGroupList) {
      const tmp: Group[] = this._addedGroupList.map(
        ad => this._groupList.find(u => u.Id === ad.Group.Id)
      );
      this._filteredGroupList = this._groupList.filter(
        g => tmp.indexOf(g) < 0
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createGroupOfUser(groupIdList: string[]) {
    const groupUserList: GroupUserCM[] = groupIdList.map(e => ({
      UserId: this.user.Id,
      GroupId: e,
    }));
    this.groupUserService.createGroupUser(groupUserList)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
