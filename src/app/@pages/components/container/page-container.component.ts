import { Component, OnInit,Input,HostListener, ViewEncapsulation } from '@angular/core';
import { PagesToggleService} from '../../services/toggler.service';

@Component({
  selector: 'page-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./page-container.scss'],
  encapsulation:ViewEncapsulation.None,
  host:{
    'class':'page-container'
  }
})
export class pageContainer {

  constructor(private toggler:PagesToggleService) {
  }

  @HostListener('mouseenter', ["$event"])
  @HostListener('tap', ["$event"])
  triggerMouseOverCall(){
    this.toggler.triggerPageContainerHover(true);
  }
}
