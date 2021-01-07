import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HistoryComponent } from 'src/app/process/components/history/history.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private connection: SignalR.HubConnection;
  notification: Subject<Notification>;
  historyComponent: HistoryComponent;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.initNotification();
  }

  initNotification() {
    this.notification = new Subject<Notification>();
    this.notification.subscribe(() => {
      if (this.router) {
        if (this.router.url && this.router.url.startsWith('/process')) {
          if (this.historyComponent) {
            this.historyComponent.getData();
          }
        }
      }
    });
  }

  connect(accessToken: string) {
    if (!this.connection) {
      this.connection = new SignalR.HubConnectionBuilder()
        // .withUrl('https://apiv2.vkhealth.vn/CenterHub', { accessTokenFactory: () => accessToken })
        .withUrl(
          `${environment.endPoint}${environment.apiPaths.notification.centerHub}`,
          { accessTokenFactory: () => accessToken }
        ).build();
    }

    this.connection.on('Notify', (response) => {
      const notification: Notification = JSON.parse(response);
      this.notification.next(notification);
    });

    this.connection.start().catch(error => console.error(error));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.notification.unsubscribe();
      this.initNotification();
      this.connection = null;
    }
  }

  getNotification(): Promise<Notification[]> {
    return this.httpClient.get<Notification[]>(
      `${environment.endPoint}${environment.apiPaths.notification.get}`
    ).toPromise();
  }

  toggleSeen(id: string): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.notification.put}${environment.apiPaths.notification.toggleSeen}${id}`,
      {}
    ).toPromise();
  }

}
