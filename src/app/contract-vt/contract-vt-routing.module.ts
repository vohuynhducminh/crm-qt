import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractVtPageComponent } from './pages/contract-vt-page/contract-vt-page.component';
import { ContractVtInfoPageComponent } from './pages/contract-vt-info-page/contract-vt-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContractVtPageComponent,
  },
  {
    path: ':id',
    component: ContractVtInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractVtRoutingModule { }
