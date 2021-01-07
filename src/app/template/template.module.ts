import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplatePageComponent } from './pages/template-page/template-page.component';
import { TemplateComponent } from './components/template/template/template.component';
import { EditTemplateComponent } from './components/template/edit-template/edit-template.component';
import { CreateTemplateComponent } from './components/template/create-template/create-template.component';
import { PreviewTemplateComponent } from './components/preview-template/preview-template/preview-template.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TemplatePageComponent,
    TemplateComponent,
    EditTemplateComponent,
    CreateTemplateComponent,
    PreviewTemplateComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    PagesRevoxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [
    EditTemplateComponent,
  ],
})
export class TemplateModule { }
