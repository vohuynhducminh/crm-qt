import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import {
  CreateCommonServiceComponent,
  CreateCommonServiceSubComponent,
  ListCommonServiceComponent,
  ListCommonServiceSubComponent,
  UpdateCommonServiceComponent,
  UpdateCommonServiceSubComponent,
} from './components';
import { ServiceComponent } from './pages';
const COMPONENTS = [
  CreateCommonServiceComponent,
  CreateCommonServiceSubComponent,
  ListCommonServiceComponent,
  ListCommonServiceSubComponent,
  UpdateCommonServiceComponent,
  UpdateCommonServiceSubComponent,
];
const PAGES = [ServiceComponent];

@NgModule({
  imports: [
    CommonModule,
    ServiceRoutingModule,
    CoreModule,
    PagesRevoxModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    pgUploadModule,
  ],
  declarations: [...COMPONENTS, ...PAGES],
})
export class ServiceModule { }
