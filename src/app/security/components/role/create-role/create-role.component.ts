import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleService } from '../../../services/role.service';
import { Role, RoleCM } from '../../../models/role';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() father: string;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createRole(name: string) {
    const roleCM: RoleCM = {
      Name: this.father + '---' + name,
    };
    this.roleService.createRole(roleCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
