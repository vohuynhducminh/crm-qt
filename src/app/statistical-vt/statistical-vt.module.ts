import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { CoreModule } from '../core/core.module';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { HTemplateDirective } from './directives/h-template.directive';
import { ChartFrameComponent } from './components/chart-frame/chart-frame.component';
import { ListStatisticalVtComponent } from './components/list-statistical-vt/list-statistical-vt.component';
import { StatisticalVtComponent } from './pages/statistical-vt/statistical-vt.component';
import { StatisticalVtRoutingModule } from './statistical-vt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticalVtRoutingModule,
    PagesRevoxModule,
    CoreModule,
    pgTabsModule,
  ],
  declarations: [ListStatisticalVtComponent, ChartFrameComponent, HTemplateDirective, StatisticalVtComponent],
})
export class StatisticalVtModule { }
