import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { Subscription, Subject } from 'rxjs';
import { MessageService } from './@pages/components/message/message.service';
import { GlobalService } from './core/services/global.service';
import { KudoAuthService } from './authorize/services/kudo-auth.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { Notification } from './core/models/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'qtsc-crm';
  notificationSubscription: Subscription;
  username: string;

  constructor(
    private authGuardService: AuthGuardService,
    private notificationService: NotificationService,
    private messageService: MessageService,
    private kudoAuthService: KudoAuthService,
    public globalService: GlobalService
  ) { }

  ngOnInit() {
    this.kudoAuthService.getUserInfo()
      .then(() => {
        const token = this.authGuardService.getToken();
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
        if (token) {
          this.notificationService.connect(token.access_token);
        }
      })
      .catch(error => console.error(error));
  }

  // randomText() {
  //   let text = '';
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i < 5; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // }
}
