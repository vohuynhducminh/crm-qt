import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRevoxModule } from '../@pages/pages-revox.module';

import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { WorkFlowPageComponent } from './pages/work-flow-page/work-flow-page.component';
import { WorkFlowComponent } from './components/work-flow/work-flow/work-flow.component';
import { CreateWorkFlowComponent } from './components/work-flow/create-work-flow/create-work-flow.component';
import { EditWorkFlowComponent } from './components/work-flow/edit-work-flow/edit-work-flow.component';
import { WorkFlowInstanceComponent } from './components/work-flow-instance/work-flow-instance/work-flow-instance.component';
import { CreateWorkFlowInstanceComponent } from './components/work-flow-instance/create-work-flow-instance/create-work-flow-instance.component';
import { EditWorkFlowInstanceComponent } from './components/work-flow-instance/edit-work-flow-instance/edit-work-flow-instance.component';
import { WorkFlowConnectionComponent } from './components/work-flow-connection/work-flow-connection/work-flow-connection.component';
import { CreateWorkFlowConnectionComponent } from './components/work-flow-connection/create-work-flow-connection/create-work-flow-connection.component';
import { EditWorkFlowConnectionComponent } from './components/work-flow-connection/edit-work-flow-connection/edit-work-flow-connection.component';
import { FormsModule } from '@angular/forms';
import { WorkFlowInstanceFileComponent } from './components/work-flow-instance-config/work-flow-instance-file/work-flow-instance-file.component';
import { WorkFlowInstanceFormComponent } from './components/work-flow-instance-config/work-flow-instance-form/work-flow-instance-form.component';
import { WorkFlowInstanceConfigPageComponent } from './pages/work-flow-instance-config-page/work-flow-instance-config-page.component';
import { CoreModule } from '../core/core.module';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    WorkFlowPageComponent,
    WorkFlowComponent,
    WorkFlowInstanceComponent,
    WorkFlowConnectionComponent,
    CreateWorkFlowComponent,
    CreateWorkFlowInstanceComponent,
    CreateWorkFlowConnectionComponent,
    EditWorkFlowComponent,
    EditWorkFlowConnectionComponent,
    EditWorkFlowInstanceComponent,
    WorkFlowInstanceFileComponent,
    WorkFlowInstanceFormComponent,
    WorkFlowInstanceConfigPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    WorkFlowRoutingModule,
    PagesRevoxModule,
    FormsModule,
    TooltipModule.forRoot(),
  ],
  entryComponents: [
    EditWorkFlowComponent,
    EditWorkFlowConnectionComponent,
    EditWorkFlowInstanceComponent,
  ],
})
export class WorkFlowModule { }
