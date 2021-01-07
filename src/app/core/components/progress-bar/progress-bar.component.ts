import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  progress = 0;
  requestEventSubscription: Subscription;
  showProgressBar = true;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.requestEventSubscription = this.globalService.requestEvent.subscribe(
      (progress: number) => {
        this.showProgressBar = true;
        this.progress = progress;
        if (progress === 100) {
            this.showProgressBar = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.requestEventSubscription.unsubscribe();
  }

}
