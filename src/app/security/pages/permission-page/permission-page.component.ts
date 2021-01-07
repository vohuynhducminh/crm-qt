import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Permission } from '../../models/permission';
import { PermissionService } from '../../services/permission.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { EditPermissionComponent } from '../../components/permission/edit-permission/edit-permission.component';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss'],
})
export class PermissionPageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: Permission[] = [];
  filteredData: Permission[] = [];
  modalRef: BsModalRef;

  constructor(
    private permissionService: PermissionService,
    private modalService: BsModalService,
    private authService: AuthGuardService,
    private router: Router
  ) {
    if (!this.authService.checkAccess(['security', 'permission', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.permissionService.getPermission()
      .then((response: Permission[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch(error => console.error(error));
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.Name.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openModal(permission: Permission) {
    this.modalRef = this.modalService.show(EditPermissionComponent, { initialState: { permission }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deletePermission(permission: Permission) {
    this.permissionService.deletePermission(permission)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
