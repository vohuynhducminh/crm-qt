import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './components/contract/contract/contract.component';
import { ContractPageComponent } from './pages/contract-page/contract-page.component';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateContractComponent } from './components/contract/create-contract/create-contract.component';
import { TooltipModule } from 'ngx-bootstrap';
import { DetailContractComponent } from './components/contract/detail-contract/detail-contract.component';
import { ContractInfoPageComponent } from './pages/contract-info-page/contract-info-page.component';
import { ContractAnnexComponent } from './components/contract-annex/contract-annex/contract-annex.component';
import { ContractChartComponent } from './components/contract-chart/contract-chart/contract-chart.component';

@NgModule({
  declarations: [
    ContractComponent,
    ContractPageComponent,
    CreateContractComponent,
    DetailContractComponent,
    ContractInfoPageComponent,
    ContractAnnexComponent,
    ContractChartComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ContractRoutingModule,
    PagesRevoxModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
})
export class ContractModule { }
