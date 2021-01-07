
import { Component, OnInit, Input, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';

@Component({
  selector: 'pg-menu-items',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('toggleHeight', [
      state('close', style({
        height: '0',
        overflow: 'hidden',
        marginBottom: '0',
        display: 'none',
      })),
      state('open', style({
        display: 'block',
        height: '*',
        marginBottom: '10px',
        overflow: 'hidden',
      })),
      transition('close => open', animate('140ms ease-in')),
      transition('open => close', animate('140ms ease-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit, AfterViewInit {
  menuGroups = [];
  currentItem = null;
  isPerfectScrollbarDisabled = false;
  routerChangeSubscription;
  currentUrl: string;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.routerChangeSubscription = this.router.events.subscribe(
      () => {
        const data = this.router.url.replace('process', 'work-flow-customer').split('/');
        if (!(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
          .test(data[data.length - 1])) {
          this.currentUrl = this.router.url;
        } else {
          this.currentUrl = '';
          data.forEach((e, i) => {
            if (i < data.length - 1 && i > 0) {
              this.currentUrl += '/' + e;
            }
          });
        }
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.togglePerfectScrollbar();
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.togglePerfectScrollbar();
  }

  togglePerfectScrollbar() {
    this.isPerfectScrollbarDisabled = window.innerWidth < 1025;
  }

  @Input()
  set Items(value: any) {
    this.menuGroups = value;
  }

  toggleNavigationSub(event: any, item: any) {
    event.preventDefault();
    if (this.currentItem && this.currentItem !== item) {
      this.currentItem['toggle'] = 'close';
    }
    this.currentItem = item;
    item.toggle = (item.toggle === 'close' ? 'open' : 'close');
  }
}
