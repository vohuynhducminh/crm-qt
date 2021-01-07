import { Component, OnInit, Output, EventEmitter, TemplateRef, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleOfGroupService } from 'src/app/security/services/role-of-group.service';
import { RoleOfGroup, RoleOfGroupVM, RoleOfGroupCM } from 'src/app/security/models/role-of-group';
import { Group } from 'src/app/security/models/group';
import { Role } from 'src/app/security/models/role';

@Component({
  selector: 'app-create-role-of-group',
  templateUrl: './create-role-of-group.component.html',
  styleUrls: ['./create-role-of-group.component.scss'],
})
export class CreateRoleOfGroupComponent implements OnInit, OnChanges {

  @Input() group: Group;
  @Input()
  set roleList(roleList: Role[]) {
    if (roleList) { this._roleList = [...roleList]; }
  }

  @Input()
  set addedRoleOfGroup(addedRoleOfGroup: RoleOfGroupVM[]) {
    if (addedRoleOfGroup) { this._addedRoleOfGroup = [...addedRoleOfGroup]; }
  }

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  _addedRoleOfGroup: RoleOfGroupVM[];
  _roleList: Role[];
  _filteredRoleList: Role[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private roleOfGroupService: RoleOfGroupService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this._roleList && this._addedRoleOfGroup) {
      const tmp: Role[] = this._addedRoleOfGroup.map(
        rog => this._roleList.find(r => r.Id === rog.Role.Id)
      );
      this._filteredRoleList = this._roleList.filter(
        r => tmp.indexOf(r) < 0
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createRoleOfGroup(roleIdList: string[]) {
    const roleOfGroupCM: RoleOfGroupCM = {
      GroupId: this.group.Id,
      RoleIds: roleIdList,
    };
    this.roleOfGroupService.createRoleOfGroup(roleOfGroupCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
