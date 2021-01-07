import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ContractCooperationPageComponent,
  ContractCooperationDetailPageComponent
} from './pages';
const routes: Routes = [
  { path: '', component: ContractCooperationPageComponent },
  { path: ':id', component: ContractCooperationDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractCooperationRoutingModule { }
