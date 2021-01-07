// Angular Core
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Layouts
import { RootLayoutComponent } from './layouts/root.component';

// Layout Service - Required
import { PagesToggleService } from './services/toggler.service';

// Shared Layout Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { QuickviewComponent } from './components/quickview/quickview.component';
import { QuickviewService } from './components/quickview/quickview.service';
import { SearchOverlayComponent } from './components/search-overlay/search-overlay.component';
import { HeaderComponent } from './components/header/header.component';
import { HorizontalMenuComponent } from './components/horizontal-menu/horizontal-menu.component';
import { SharedModule } from './components/shared.module';
import { pgListViewModule} from './components/list-view/list-view.module';
import { pgCardModule} from './components/card/card.module';
import { pgCardSocialModule} from './components/card-social/card-social.module';

// Basic Bootstrap Modules
import {
  BsDropdownModule,
  AccordionModule,
  AlertModule,
  ButtonsModule,
  CollapseModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
  TypeaheadModule,
} from 'ngx-bootstrap';

// Pages Globaly required Components - Optional
import { pgTabsModule } from './components/tabs/tabs.module';
import { pgSwitchModule } from './components/switch/switch.module';
import { ProgressModule } from './components/progress/progress.module';

// Thirdparty Components / Plugins - Optionard
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MessageService } from './components/message/message.service';
import { MessageModule } from './components/message/message.module';
import { pgSliderModule } from './components/slider/slider.module';
import { pgSelectModule } from './components/select/select.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { pgDatePickerModule } from './components/datepicker/datepicker.module';
import { pgTimePickerModule } from './components/time-picker/timepicker.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NvD3Module } from 'ngx-nvd3';
import { pgCollapseModule } from './components/collapse';
import { pgUploadModule } from './components/upload/upload.module';
import { pgSelectfx } from './components/cs-select/select.module';
import { TextMaskModule } from 'angular2-text-mask';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

// Hammer Config Overide
// https://github.com/angular/angular/issues/10541
export class AppHammerConfig extends HammerGestureConfig  {
  overrides = <any> {
    'pinch': { enable: false },
    'rotate': { enable: false },
  };
}

@NgModule({
  declarations: [
    SidebarComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    RootLayoutComponent,
  ],
  imports: [
    // CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    MessageModule,
    ProgressModule,
    pgListViewModule,
    pgCardModule,
    pgCardSocialModule,
    pgSliderModule,
    pgTabsModule,
    pgSwitchModule,
    pgDatePickerModule,
    pgTimePickerModule,
    pgTabsModule,
    pgSelectfx,
    pgCollapseModule,
    pgUploadModule,
    TextMaskModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    PerfectScrollbarModule,
    QuillModule,
    NvD3Module,
    NgxEchartsModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary mr-2',
      cancelButtonClass: 'btn btn-danger',
    }),
  ],
  providers: [
    QuickviewService,
    PagesToggleService,
    MessageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AppHammerConfig,
    },
  ],
  exports: [
    NgxDatatableModule,
    QuillModule,
    pgListViewModule,
    pgCardModule,
    pgCardSocialModule,
    pgSliderModule,
    pgSelectModule,
    pgCollapseModule,
    pgDatePickerModule,
    pgTimePickerModule,
    pgUploadModule,
    RootLayoutComponent,
    SharedModule,
    SidebarComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    ModalModule,
    SweetAlert2Module,
    BsDropdownModule,
    NgxEchartsModule,
    NvD3Module,
    NgxDatatableModule,
    ProgressbarModule,
    pgTabsModule,
    pgSelectfx,
    TextMaskModule,
  ],
})
export class PagesRevoxModule { }
