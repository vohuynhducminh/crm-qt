import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './components/form/form/form.component';
import { CreateFormComponent } from './components/form/create-form/create-form.component';
import { EditFormComponent } from './components/form/edit-form/edit-form.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { PreviewFormComponent } from './components/preview-form/preview-form/preview-form.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    FormComponent,
    CreateFormComponent,
    FormPageComponent,
    PreviewFormComponent,
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    PagesRevoxModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    DragulaModule.forRoot(),
  ],
  bootstrap: [
    EditFormComponent,
  ],
})
export class FormModule { }
