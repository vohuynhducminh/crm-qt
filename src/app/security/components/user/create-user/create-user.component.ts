import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'src/app/security/services/user.service';
import { User, UserCM } from 'src/app/security/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  createUser(username: string, password: string) {
    const userCM: UserCM = {
      UserName: username,
      Password: password,
      Fullname: null,
    };
    this.userService.createUser(userCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
