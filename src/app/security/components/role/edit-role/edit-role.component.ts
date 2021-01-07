import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {

  role: { Id: string, Name: string, Father: string };
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private roleService: RoleService
  ) {
   }

  ngOnInit() {
  }

  updateRole() {
    this.roleService.updateRole(this.role)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
