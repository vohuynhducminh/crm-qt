import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { Token } from '../../models/token';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subscription, Subject } from 'rxjs';
import { Notification } from 'src/app/core/models/notification';
import { MessageService } from 'src/app/@pages/components/message/message.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  userName: string;
  password: string;
  loginFailed: string;
  notificationSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private authGuardService: AuthGuardService,
    private globalService: GlobalService,
    private notificationService: NotificationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    const token: Token = this.authGuardService.getToken();
    if (token) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.loginService.login(this.userName, this.password)
      .then(
        async (response: Token) => {
          if (response) {
            await this.authGuardService.setToken(response, this.userName);
            this.router.navigate(['']);
            this.globalService.isLogin = true;
            this.globalService.userName = this.userName;
            this.notificationSubscription = this.notificationService.notification.subscribe(
              (notification: Notification) => {
                if (notification.NData) {
                  const subject: Subject<any> = new Subject();
                  subject.subscribe(() => {
                    subject.unsubscribe();
                  });
                  this.messageService.create(
                    notification.Type,
                    notification.Body,
                    {
                      Title: notification.Title,
                      imgURL: '/assets/human.png',
                      Style: 'circle',
                      Position: 'bottom-left',
                      Duration: 5000,
                      PauseOnHover: true,
                      ClickContentSubject: subject,
                    }
                  );
                } else {
                  this.messageService.create(
                    notification.Type,
                    notification.Body,
                    {
                      Title: notification.Title,
                      imgURL: '/assets/human.png',
                      Style: 'circle',
                      Position: 'bottom-left',
                      Duration: 5000,
                      PauseOnHover: true,
                    }
                  );
                }
              }
            );
            this.notificationService.connect(response.access_token);
          }
        }
      )
      .catch(error => {
        this.globalService.isLogin = false;
        this.loginFailed = error.error['login_failure'];
      });
  }

  resetLoginFailed() {
    this.loginFailed = null;
  }

}
