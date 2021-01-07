import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StatisticalVtComponent } from './pages/statistical-vt/statistical-vt.component';

const routes: Routes = [
  { path: '', component: StatisticalVtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticalVtRoutingModule { }
