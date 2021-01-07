import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueVtRoutingModule } from './revenue-vt-routing.module';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule } from '@angular/forms';
import { RevenueVtPageComponent } from './pages/revenue-vt-page/revenue-vt-page.component';
import { ListRevenueVtComponent } from './components/revenue-vt/list-revenue-vt/list-revenue-vt.component';
import { DetailRevenueVtComponent } from './components/revenue-vt/detail-revenue-vt/detail-revenue-vt.component';
import { TooltipModule } from 'ngx-bootstrap';
import { RevenueVtInfoPageComponent } from './pages/revenue-vt-info-page/revenue-vt-info-page.component';

@NgModule({
  declarations: [
    RevenueVtPageComponent,
    ListRevenueVtComponent,
    DetailRevenueVtComponent,
    RevenueVtInfoPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RevenueVtRoutingModule,
    PagesRevoxModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
})
export class RevenueVtModule { }
