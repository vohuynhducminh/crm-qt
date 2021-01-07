import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizeRoutingModule } from './authorize-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { PagesRevoxModule } from '../@pages/pages-revox.module';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    AuthorizeRoutingModule,
    PagesRevoxModule,
    FormsModule,
  ],
})
export class AuthorizeModule { }
