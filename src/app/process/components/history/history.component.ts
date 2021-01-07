import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HistoryService } from 'src/app/process/services/history.service';
import { History } from 'src/app/process/models/history';
import { FormResponse } from 'src/app/core/models/form';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input()
  set customerWorkFlowId(customerWorkFlowId: string) {
    if (customerWorkFlowId) {
      this._customerWorkFlowId = customerWorkFlowId;
      this.getData();
    }
  }

  @Output() selectionChangeHandler: EventEmitter<string> = new EventEmitter<string>();

  data: History[];
  currentInstanceId: string;
  _customerWorkFlowId: string;
  formResponse: FormResponse;
  selectedId: string;
  selectedHistory: any;

  constructor(
    private historyService: HistoryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.historyComponent = this;
  }

  getData() {
    if (this._customerWorkFlowId) {
      this.historyService.getHistory(this._customerWorkFlowId)
        .then(
          (response: History[]) => {
            this.data = response;
            const currentHistory = this.data.find(e => e.Status === 1);
            if (currentHistory) {
              this.currentInstanceId = currentHistory.InstanceId;
              this.selectedHistory = currentHistory;
              this.selectedId = currentHistory.Id;
              this.historyService.getForm(this.selectedId)
                .then(
                  (res: FormResponse) => {
                    this.formResponse = res;
                    if (this.formResponse) {
                      this.formResponse.FormGroups = this.formResponse.FormGroups.map(e => {
                        const fg = {...e};
                        fg.IsCurrent = this.selectedHistory.Status === 1;
                        return fg;
                      });
                    }
                  },
                  error => console.error(error)
                );
            } else {
              this.currentInstanceId = null;
              this.selectedId = null;
              this.formResponse = null;
            }
            this.scrollTo(document.querySelector('datatable-body'), 0, 500);
          }
        )
        .catch(error => console.error(error));
    }
  }

  onSelect({ selected }) {
    if (selected) {
      this.selectedHistory = selected[0];
      this.selectedId = selected[0].Id;
      if (selected[0].Status === 1) {
        this.currentInstanceId = selected[0].InstanceId;
      } else {
        this.currentInstanceId = null;
      }
      this.historyService.getForm(selected[0].Id)
        .then(
          (response: FormResponse) => {
            this.formResponse = response;
            if (this.formResponse) {
              this.formResponse.FormGroups = this.formResponse.FormGroups.map(e => {
                const fg = {...e};
                fg.IsCurrent = this.selectedHistory.Status === 1;
                return fg;
              });
            }
          },
          error => console.error(error)
        );
    }
  }

  scrollTo(element: any, to: number, duration: number) {
    const start = element.scrollTop,
        change = to - start,
        increment = 20;
    let currentTime = 0;

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }

}
