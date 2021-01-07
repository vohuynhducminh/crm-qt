import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupService } from '../../../services/group.service';
import { Group, GroupCM } from '../../../models/group';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createGroup(name: string) {
    const groupCM: GroupCM = {
      Name: name,
    };
    this.groupService.createGroup(groupCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
