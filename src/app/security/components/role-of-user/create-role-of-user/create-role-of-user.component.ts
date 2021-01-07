import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { Role } from 'src/app/security/models/role';
import { User } from 'src/app/security/models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleOfUserService } from 'src/app/security/services/role-of-user.service';
import { RoleOfUser, RoleOfUserVM, RoleOfUserCM } from 'src/app/security/models/role-of-user';

@Component({
  selector: 'app-create-role-of-user',
  templateUrl: './create-role-of-user.component.html',
  styleUrls: ['./create-role-of-user.component.scss'],
})
export class CreateRoleOfUserComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input()
  set roleList(roleList: Role[]) {
    if (roleList) { this._roleList = [...roleList]; }
  }

  @Input()
  set addedRoleOfUser(addedRoleOfUser: RoleOfUserVM[]) {
    if (addedRoleOfUser) { this._addedRoleOfUser = [...addedRoleOfUser]; }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedRoleOfUser: RoleOfUserVM[];
  _roleList: Role[];
  _filteredRoleList: Role[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private roleOfUserService: RoleOfUserService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._roleList && this._addedRoleOfUser) {
      const tmp: Role[] = this._addedRoleOfUser.map(
        rou => this._roleList.find(r => r.Id === rou.Role.Id)
      );
      this._filteredRoleList = this._roleList.filter(
        r => tmp.indexOf(r) < 0
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createRoleOfUser(roleIdList: string[]) {
    const roleOfUserCM: RoleOfUserCM = {
      UserId: this.user.Id,
      RoleIds: roleIdList,
    };
    this.roleOfUserService.createRoleOfUser(roleOfUserCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
