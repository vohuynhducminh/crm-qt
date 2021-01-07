import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'contract',
    loadChildren: './contract/contract.module#ContractModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'contract-vt',
    loadChildren: './contract-vt/contract-vt.module#ContractVtModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'contract-cooperation',
    loadChildren: './contract-cooperation/contract-cooperation.module#ContractCooperationModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'customer',
    loadChildren: './customer/customer.module#CustomerModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'form',
    loadChildren: './form/form.module#FormModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'process',
    loadChildren: './process/process.module#ProcessModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'revenue',
    loadChildren: './revenue/revenue.module#RevenueModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'service',
    loadChildren: './service/service.module#ServiceModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'revenue-vt',
    loadChildren: './revenue-vt/revenue-vt.module#RevenueVtModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistical-vt',
    loadChildren: './statistical-vt/statistical-vt.module#StatisticalVtModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'security',
    loadChildren: './security/security.module#SecurityModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'template',
    loadChildren: './template/template.module#TemplateModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'work-flow-config',
    loadChildren: './work-flow/work-flow.module#WorkFlowModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'work-flow-customer',
    loadChildren: './work-flow-customer/work-flow-customer.module#WorkFlowCustomerModule',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
