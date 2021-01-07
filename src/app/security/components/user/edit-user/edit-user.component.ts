import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/security/models/user';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  updateUser() {
    this.userService.updateUser(this.user)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
