import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractCooperationRoutingModule } from './contract-cooperation-routing.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { CoreModule } from '../core/core.module';
import { TabViewModule } from 'primeng/tabview';
import { pgUploadModule } from '../@pages/components/upload/upload.module';

import {
  ContractCooperationComponent,
  CreateContractCooperationComponent,
  DetailContractCooperationComponent,
  ContractCooperationSubComponent,
  CreateContractCooperationSubComponent,
  UpdateContractCooperationSubComponent,
  ContractCooperationServiceComponent,
  CreateContractCooperationServiceComponent,
  UpdateContractCooperationServiceComponent
} from './components';
import {
  ContractCooperationPageComponent,
  ContractCooperationDetailPageComponent,
} from './pages';

const COMPONENTS = [
  ContractCooperationComponent,
  CreateContractCooperationComponent,
  DetailContractCooperationComponent,
  ContractCooperationSubComponent,
  CreateContractCooperationSubComponent,
  UpdateContractCooperationSubComponent,
  ContractCooperationServiceComponent,
  CreateContractCooperationServiceComponent,
  UpdateContractCooperationServiceComponent,

];
const PAGES = [
  ContractCooperationPageComponent,
  ContractCooperationDetailPageComponent,
];
@NgModule({
  imports: [
    CommonModule,
    ContractCooperationRoutingModule,
    CoreModule,
    PagesRevoxModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    TabViewModule,
    pgUploadModule,
  ],
  declarations: [...COMPONENTS, ...PAGES],
})
export class ContractCooperationModule { }
