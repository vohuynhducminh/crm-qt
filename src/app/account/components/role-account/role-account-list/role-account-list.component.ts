import { Component, OnInit, Input } from '@angular/core';
import { RoleVM, AccountVM } from 'src/app/account/models';
import { AccountService } from 'src/app/account/services';

@Component({
  selector: 'app-role-account-list',
  templateUrl: './role-account-list.component.html',
  styleUrls: ['./role-account-list.component.scss'],
})
export class RoleAccountListComponent implements OnInit {
  @Input()
  set role(data: RoleVM) {
    if (data) {
      this.service.useGetAll(data.Name)
        .then((res) => {
          this.accounts = res;
          this.useFilter();
        }).catch((err) => {
          this.accounts = [];
        });
    } else {
      this.accounts = [];
    }
  }
  accounts: AccountVM[] = [];
  searchAccounts: AccountVM[] = [];
  name = '';
  constructor(private service: AccountService) { }

  ngOnInit() {
  }

  useFilter = () => {
    this.searchAccounts = this.accounts.filter(account => (account.FullName ? account.FullName : '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase().includes(this.name.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D').toLowerCase()));
  }
}
