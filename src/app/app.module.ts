// Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './core/services/request-interceptor.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeModule } from './authorize/authorize.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { DragulaModule } from 'ng2-dragula';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    DashboardModule,
    AppRoutingModule,
    CoreModule,
    AuthorizeModule,
    DropDownsModule,
    ExcelExportModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot(),
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
  ],
})
export class AppModule { }
