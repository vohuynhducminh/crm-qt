import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractPageComponent } from './pages/contract-page/contract-page.component';
import { ContractInfoPageComponent } from './pages/contract-info-page/contract-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContractPageComponent,
  },
  {
    path: ':id',
    component: ContractInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule { }
