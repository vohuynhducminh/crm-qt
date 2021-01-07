import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { Notification } from "../../models/notification";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification-center",
  templateUrl: "./notification-center.component.html",
  styleUrls: ["./notification-center.component.scss"],
})
export class NotificationCenterComponent implements OnInit {
  notifications: Notification[];
  _notifications: Notification[];
  hasMore = true;
  currentPage = 0;
  notificationSubject: Subscription;
  hasNewNotification = false;
  tadaAnimated = false;
  unreadCount = 0;
  pageSize = 10;

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getNotifications();
    this.notificationSubject = this.notificationService.notification.subscribe(
      (notification: Notification) => {
        Notification.calculateTimeStatus(notification);
        if (!this._notifications) {
          this._notifications = [];
        }
        this._notifications.unshift(notification);
        this.unreadCount++;
        this.hasNewNotification = true;
        this.tadaAnimated = true;
        setTimeout(() => {
          this.tadaAnimated = false;
        }, 800);
      }
    );
  }

  nextPage() {
    const seek = this.pageSize * this.currentPage;
    if (this.hasMore) {
      for (let i = 0; i < this.pageSize; i++) {
        if (this.notifications[i + seek]) {
          if (!this._notifications) {
            this._notifications = [];
          }
          this._notifications.push(this.notifications[i + seek]);
        }
      }
      this.currentPage++;
      this.hasMore =
        this.pageSize * this.currentPage < this.notifications.length;
    }
  }

  getNotifications() {
    this.notificationService.getNotification().then(
      (response: Notification[]) => {
        this.notifications = response;
        this.setUnreadCount();
        for (let i = 0; i < this.notifications.length; i++) {
          Notification.calculateTimeStatus(this.notifications[i]);
        }
        this.hasMore = this.notifications && this.notifications.length > 0;
        if (this.currentPage === 0) {
          this.nextPage();
        } else {
          const n = this.currentPage;
          this.currentPage = 0;
          this._notifications = [];
          for (let i = 0; i < n; i++) {
            this.nextPage();
          }
        }
      },
      (error) => console.error(error)
    );
  }

  toggleSeen(index: number) {
    this.notificationService.toggleSeen(this._notifications[index].Id);
    this._notifications[index].IsSeen = !this._notifications[index].IsSeen;
    this.setUnreadCount();
  }

  routingNoti(index: number, notification: Notification) {
    if (!notification.IsSeen) {
      this.toggleSeen(index);
    }
    if (notification.NData) {
      try {
        const noti_NData = JSON.parse(notification.NData);
        if (
          noti_NData.hasOwnProperty("type") &&
          noti_NData.type === 0 &&
          noti_NData.url
        ) {
          if (noti_NData.url.includes(".xlsx")) {
            window.open(
              //"http://crmbe.hisoft.vn/api/Customers/File?filePath=" +
              "https://apicrm.qtsc.com.vn/api/Customers/File?filePath=" +
              noti_NData.url,
              "_blank"
            );
          } else {
            this.router.navigate([noti_NData.url]);
          }
        }
      } catch (error) {
        console.error("noti_NData ERROR:", error);
      }
    }
  }

  setUnreadCount() {
    this.unreadCount = this.notifications.filter(
      (e) => e.IsSeen === false
    ).length;
  }
}
