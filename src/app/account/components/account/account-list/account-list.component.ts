import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AccountService } from 'src/app/account/services';
import { AccountVM, RoleVM } from 'src/app/account/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  @Input() roles: RoleVM[] = [];
  @Output() useChange: EventEmitter<{ account: AccountVM, accounts: AccountVM[] }> = new EventEmitter();
  accounts: AccountVM[] = [];
  accountSelected: AccountVM;
  selected = [];
  name = '';
  searchAccounts: AccountVM[] = [];

  constructor(
    private service: AccountService
  ) { }

  ngOnInit() {
    this.useLoadData();
  }

  useFilter = () => {
    this.searchAccounts = this.accounts.filter((account) => (account.FullName ? account.FullName : '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase().includes(this.name.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase()));
  }

  useLoadData = () => {
    this.service.useGetAll()
      .then((res) => {
        this.accounts = res;
        this.useFilter();
        if (this.accountSelected) {
          this.accountSelected = res.find((e) => e.Id === this.accountSelected.Id);
          this.selected = [this.accountSelected];
          this.useChange.emit({ account: this.accountSelected, accounts: this.accounts });
        } else {
          this.useChange.emit({ account: undefined, accounts: this.accounts });
        }
      });
  }
  useSelect = ({ selected }: { selected: AccountVM[] }) => {
    this.accountSelected = selected[0];
    this.accounts = [...this.accounts];
    this.useChange.emit({ account: this.accountSelected, accounts: this.accounts });
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
        this.service.useDelete(this.accountSelected.Id).then(() => {
          swal('Thông báo', 'Xóa nhân viên ' + this.accountSelected.UserName + ' thành công', 'success');
          this.accounts = this.accounts.filter((e) => e.Id !== this.accountSelected.Id);
          this.accountSelected = undefined;
          this.useChange.emit({ account: undefined, accounts: this.accounts });
        });
      }
    });
  }

}
