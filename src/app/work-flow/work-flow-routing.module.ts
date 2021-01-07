import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkFlowPageComponent } from './pages/work-flow-page/work-flow-page.component';
import { WorkFlowInstanceConfigPageComponent } from './pages/work-flow-instance-config-page/work-flow-instance-config-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkFlowPageComponent,
  },
  {
    path: 'instance-config/:id',
    component: WorkFlowInstanceConfigPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkFlowRoutingModule { }
