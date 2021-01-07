import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProcessTableComponent } from './components/process-table/process-table/process-table.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule } from '@angular/forms';
import { HTemplateDirective } from './directives/h-template.directive';
import { ChartFrameComponent } from './components/chart-frame/chart-frame.component';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { DragulaModule } from 'ng2-dragula';
import { CoreModule } from '../core/core.module';
import { TooltipModule } from 'ngx-bootstrap';
import { TreeTableModule } from 'primeng/treetable';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProcessTableComponent,
    HTemplateDirective,
    ChartFrameComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PagesRevoxModule,
    FormsModule,
    pgTabsModule,
    DragulaModule.forRoot(),
    CoreModule,
    TooltipModule,
    TreeTableModule,
    TabViewModule,
  ],
})
export class DashboardModule { }
