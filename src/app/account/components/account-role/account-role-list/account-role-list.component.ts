import { Component, OnInit, Input } from '@angular/core';
import { AccountVM, RoleVM } from 'src/app/account/models';

@Component({
  selector: 'app-account-role-list',
  templateUrl: './account-role-list.component.html',
  styleUrls: ['./account-role-list.component.scss'],
})
export class AccountRoleListComponent implements OnInit {
  @Input() roles: RoleVM[] = [];
  @Input()
  set account(data: AccountVM) {
    this.data = data ? data.RoleNames.map((e) => ({ Name: e })) : [];
    this.useFilter();
    this.accountSelected = data;
  }
  data: { Name: string }[] = [];
  accountSelected: AccountVM;
  name = '';
  searchData: { Name: string }[] = [];
  constructor() { }

  ngOnInit() {
  }

  useFilter = () => {
    this.searchData = this.data.filter(data => data.Name.toLowerCase().includes(this.name.toLowerCase()));
  }

  insertRole(roles: string[]) {
    this.accountSelected.RoleNames.forEach((e) => {
      roles.push(e);
    });
    this.accountSelected.RoleNames = roles.map((e) => e);
    this.data = roles.map((e) => ({Name: e}));
    console.log(this.data);
    console.log(this.accountSelected);
  }
}
