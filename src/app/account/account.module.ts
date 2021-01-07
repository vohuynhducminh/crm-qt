import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../core/core.module';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import {
  AccountCreateComponent,
  AccountListComponent,
  AccountRoleCreateComponent,
  AccountRoleListComponent,
  AccountRoleUpdateComponent,
  AccountUpdateComponent,
  RoleAccountCreateComponent,
  RoleAccountListComponent,
  RoleAccountUpdateComponent,
  RoleCreateComponent,
  RoleListComponent,
  RoleUpdateComponent
} from './components';
import { AccountHomeComponent } from './pages';
const PAGES = [AccountHomeComponent];
const COMPOENENTS = [
  AccountCreateComponent,
  AccountListComponent,
  AccountRoleCreateComponent,
  AccountRoleListComponent,
  AccountRoleUpdateComponent,
  AccountUpdateComponent,
  RoleAccountCreateComponent,
  RoleAccountListComponent,
  RoleAccountUpdateComponent,
  RoleCreateComponent,
  RoleListComponent,
  RoleUpdateComponent,
];
@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    CoreModule,
    PagesRevoxModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    pgUploadModule,
  ],
  declarations: [...PAGES, ...COMPOENENTS],
})
export class AccountModule { }
