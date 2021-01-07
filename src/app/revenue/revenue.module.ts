import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueRoutingModule } from './revenue-routing.module';
import { RevenuePageComponent } from './pages/revenue-page/revenue-page.component';
import { CreateRevenueComponent } from './components/revenue/create-revenue/create-revenue.component';
import { RevenueComponent } from './components/revenue/revenue/revenue.component';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [
    RevenueComponent,
    CreateRevenueComponent,
    RevenuePageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RevenueRoutingModule,
    PagesRevoxModule,
    FormsModule,
    DropDownsModule,
  ],
})
export class RevenueModule { }
