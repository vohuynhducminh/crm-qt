import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessPageComponent } from './pages/process-page/process-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProcessPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRoutingModule { }
