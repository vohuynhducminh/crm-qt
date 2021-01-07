import { Component, OnInit, Input } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() userName: string;

  constructor(
    private authGuardService: AuthGuardService,
    private globalService: GlobalService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.notificationService.disconnect();
    this.authGuardService.clearToken();
    this.router.navigate(['login']);
    this.globalService.isLogin = false;
  }
}
