import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkFlowCustomerRoutingModule } from './work-flow-customer-routing.module';
import { WorkFlowCustomerPageComponent } from './pages/work-flow-customer-page/work-flow-customer-page.component';
import { WorkFlowCustomerComponent } from './components/work-flow-customer/work-flow-customer/work-flow-customer.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkFlowCusComponent } from './components/work-flow-cus/work-flow-cus/work-flow-cus.component';
import { CreateWorkFlowCustomerComponent } from './components/work-flow-customer/create-work-flow-customer/create-work-flow-customer.component';
import { CustomerModule } from '../customer/customer.module';

@NgModule({
  declarations: [
    WorkFlowCustomerPageComponent,
    WorkFlowCustomerComponent,
    WorkFlowCusComponent,
    CreateWorkFlowCustomerComponent,
  ],
  imports: [
    CommonModule,
    WorkFlowCustomerRoutingModule,
    PagesRevoxModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerModule,
  ],
})
export class WorkFlowCustomerModule { }
