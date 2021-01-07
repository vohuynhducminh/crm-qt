import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { User } from '../../models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from '../../services/user.service';
import { EditUserComponent } from '../../components/user/edit-user/edit-user.component';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { constructor } from 'd3';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: User[] = [];
  filteredData: User[] = [];
  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthGuardService
  ) {
    if (!this.authService.checkAccess(['security', 'user', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

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
