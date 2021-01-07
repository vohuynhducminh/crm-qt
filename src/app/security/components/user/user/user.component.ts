import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { User } from 'src/app/security/models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'src/app/security/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: User[] = [];
  filteredData: User[] = [];
  selecting: User;
  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getUser()
      .then((response: User[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch(error => console.error(error));
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.UserName.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
  }

  openModal(user: User) {
    this.modalRef = this.modalService.show(EditUserComponent, { initialState: { user }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
