import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { CustomerWorkFlowComponent } from './components/customer-work-flow/customer-work-flow/customer-work-flow.component';
import { CreateCustomerWorkFlowComponent } from './components/customer-work-flow/create-customer-work-flow/create-customer-work-flow.component';
import { EditCustomerWorkFlowComponent } from './components/customer-work-flow/edit-customer-work-flow/edit-customer-work-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { pgTabsModule } from '../@pages/components/tabs/tabs.module';
import { CoreModule } from '../core/core.module';
import { ExportExcelComponent } from './components/customer/export-excel/export-excel.component';
import { CustomerInfoPageComponent } from './pages/customer-info-page/customer-info-page.component';
import { TooltipModule } from 'ngx-bootstrap';
import { CustomerContactComponent } from './components/customer-contact/customer-contact/customer-contact.component';
import { EditCustomerContactComponent } from './components/customer-contact/edit-customer-contact/edit-customer-contact.component';
import { CreateCustomerContactComponent } from './components/customer-contact/create-customer-contact/create-customer-contact.component';
import { CreateCustomerCareComponent } from './components/customer-care/create-customer-care/create-customer-care.component';
import { CustomerCareComponent } from './components/customer-care/customer-care/customer-care.component';
import { EditCustomerCareComponent } from './components/customer-care/edit-customer-care/edit-customer-care.component';

@NgModule({
  declarations: [
    CustomerPageComponent,
    CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    CustomerWorkFlowComponent,
    CreateCustomerWorkFlowComponent,
    EditCustomerWorkFlowComponent,
    ExportExcelComponent,
    CustomerInfoPageComponent,
    CustomerContactComponent,
    EditCustomerContactComponent,
    CreateCustomerContactComponent,
    CreateCustomerCareComponent,
    CustomerCareComponent,
    EditCustomerCareComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    CustomerRoutingModule,
    PagesRevoxModule,
    FormsModule,
    ReactiveFormsModule,
    pgTabsModule,
    TooltipModule.forRoot(),
    TextMaskModule,
  ],
  exports: [
    CreateCustomerComponent,
  ],
  bootstrap: [
    EditCustomerComponent,
    EditCustomerWorkFlowComponent,
  ],
  entryComponents: [
    EditCustomerCareComponent,
  ],
})
export class CustomerModule { }
