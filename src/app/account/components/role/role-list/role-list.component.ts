import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoleVM } from 'src/app/account/models';
import { RoleService } from 'src/app/account/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  @Output() useChange: EventEmitter<{ role: RoleVM, roles: RoleVM[] }> = new EventEmitter();
  roles: RoleVM[] = [];
  roleSelected: RoleVM;
  selected = [];
  roleName = '';
  searchRoles: RoleVM[] = [];

  constructor(
    private service: RoleService
  ) { }

  ngOnInit() {
    this.useLoadData();
  }

  useLoadData = () => {
    this.service.useGetAll()
      .then((res) => {
        this.roles = res;
        this.useFilter();
        if (this.roleSelected) {
          this.roleSelected = res.find((e) => e.Id === this.roleSelected.Id);
          this.selected = [this.roleSelected];
          this.useChange.emit({ role: this.roleSelected, roles: this.roles });
        } else {
          this.useChange.emit({ role: undefined, roles: this.roles });
        }
      });
  }

  useFilter = () => {
    this.searchRoles = this.roles.filter(role => role.Name.toLowerCase().includes(this.roleName.toLowerCase()));
  }

  useSelect = ({ selected }: { selected: RoleVM[] }) => {
    this.roleSelected = selected[0];
    this.roles = [...this.roles];
    this.useChange.emit({ role: this.roleSelected, roles: this.roles });
  }

  useDelete = () => {
    swal({
      title: 'Quyết định xóa?',
      text: 'Sau khi xóa sẽ mất hoàn toàn!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.service.useDelete(this.roleSelected.Id).then(() => {
          swal('Thông báo', 'Xóa quyền ' + this.roleSelected.Name + ' thành công', 'success');
          this.roles = this.roles.filter((e) => e.Id !== this.roleSelected.Id);
          this.roleSelected = undefined;
          this.useChange.emit({ role: undefined, roles: this.roles });
        });
      }
    });
  }

}
