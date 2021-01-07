import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { HistoryComponent } from './components/history/history.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NextStepComponent } from './components/next-step/next-step.component';
import { WorkspaceFormComponent } from './components/workspace-form/workspace-form.component';
import { CoreModule } from '../core/core.module';
import { WorkFlowHistoryFileComponent } from './components/work-flow-history-file/work-flow-history-file.component';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import { WorkFlowHistoryTemplateComponent } from './components/work-flow-history-template/work-flow-history-template.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { EventLogComponent } from './components/event-log/event-log.component';
import { QuillModule } from 'ngx-quill';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';

@NgModule({
  declarations: [
    ProcessPageComponent,
    HistoryComponent,
    NextStepComponent,
    WorkspaceFormComponent,
    WorkFlowHistoryFileComponent,
    WorkFlowHistoryTemplateComponent,
    SendEmailComponent,
    EventLogComponent,
    CustomerInfoComponent,
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    PagesRevoxModule,
    FormsModule,
    CoreModule,
    pgUploadModule,
    QuillModule,
    ReactiveFormsModule,
  ],
})
export class ProcessModule { }
