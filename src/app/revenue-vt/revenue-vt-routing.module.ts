import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenueVtPageComponent } from './pages/revenue-vt-page/revenue-vt-page.component';
import { DetailRevenueVtComponent } from './components/revenue-vt/detail-revenue-vt/detail-revenue-vt.component';
import { RevenueVtInfoPageComponent } from './pages/revenue-vt-info-page/revenue-vt-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueVtPageComponent,
  },
  {
    path: ':ContractId',
    component: RevenueVtInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueVtRoutingModule { }
