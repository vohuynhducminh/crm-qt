import { Component, OnInit } from '@angular/core';
import { AccountVM, RoleVM } from 'src/app/account/models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss'],
})
export class AccountHomeComponent implements OnInit {
  account: AccountVM;
  accounts: AccountVM[] = [];
  role: RoleVM;
  roles: RoleVM[] = [];
  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['account', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
