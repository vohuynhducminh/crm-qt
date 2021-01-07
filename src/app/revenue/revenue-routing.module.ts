import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenuePageComponent } from './pages/revenue-page/revenue-page.component';

const routes: Routes = [
  {
    path: '',
    component: RevenuePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueRoutingModule { }
