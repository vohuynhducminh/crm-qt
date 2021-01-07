import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractVtRoutingModule } from './contract-vt-routing.module';
import { ContractVtPageComponent } from './pages/contract-vt-page/contract-vt-page.component';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { ContractVtInfoPageComponent } from './pages/contract-vt-info-page/contract-vt-info-page.component';
import {
  ContractVtComponent,
  CreateContractVtComponent,
  DetailContractVtComponent,
  ContractVtAnnexComponent,
  CreateContractVtAnnexComponent,
  DetailContractVtAnnexComponent,
  DetailContractVtAnnexUComponent
} from './components';


const COMPONENTS = [
  ContractVtAnnexComponent,
  CreateContractVtAnnexComponent,
  DetailContractVtAnnexComponent,
  DetailContractVtAnnexUComponent,
  ContractVtComponent,
  CreateContractVtComponent,
  DetailContractVtComponent,
];

@NgModule({
  declarations: [
    ContractVtPageComponent,
    ContractVtInfoPageComponent,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ContractVtRoutingModule,
    PagesRevoxModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
})
export class ContractVtModule { }
