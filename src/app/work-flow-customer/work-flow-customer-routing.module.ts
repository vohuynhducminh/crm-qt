import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkFlowCustomerPageComponent } from './pages/work-flow-customer-page/work-flow-customer-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkFlowCustomerPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkFlowCustomerRoutingModule { }
