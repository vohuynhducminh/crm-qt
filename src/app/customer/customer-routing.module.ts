import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CustomerInfoPageComponent } from './pages/customer-info-page/customer-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
  },
  {
    path: ':id',
    component: CustomerInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
