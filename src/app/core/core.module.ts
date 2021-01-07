import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DynamicFieldDirective } from './components/form/dynamic-field/dynamic-field.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// form components
import { DynamicFormComponent } from './components/form/dynamic-form/dynamic-form.component';
import { InputComponent } from './components/form/input/input.component';
import { SelectComponent } from './components/form/select/select.component';
import { DateComponent } from './components/form/date/date.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { RadiobuttonComponent } from './components/form/radiobutton/radiobutton.component';
import { ButtonComponent } from './components/form/button/button.component';
import { TimeComponent } from './components/form/time/time.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { EmptyPageComponent } from './pages/empty-page.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { KudoManafileComponent } from './components/kudo-manafile/kudo-manafile.component';
import { pgUploadModule } from '../@pages/components/upload/upload.module';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FileComponent } from './components/form/file/file.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { DropdownlistFilterComponent } from './components/dropdownlist-filter/dropdownlist-filter.component';
// import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { ProgressModule } from '../@pages/components/progress/progress.module';
import { SelectCustomerComponent } from './components/form/select-customer/select-customer.component';
import { SelectIndividualComponent } from './components/form/select-individual/select-individual.component';
import { MapByPipe } from './pipes/map-by.pipe';
import { JsonArrayPipe } from './pipes/json-array.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
@NgModule({
  declarations: [
    LayoutComponent,
    ProgressBarComponent,
    InputComponent,
    TimeComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    ButtonComponent,
    SelectComponent,
    TextareaComponent,
    DateComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    EmptyPageComponent,
    UserInfoComponent,
    KudoManafileComponent,
    NotificationCenterComponent,
    FileComponent,
    DropdownlistFilterComponent,
    CutStringPipe,
    SelectCustomerComponent,
    SelectIndividualComponent,
    MapByPipe,
    JsonArrayPipe,
    CurrencyFormatPipe,
    ChipInputComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    pgUploadModule,
    TooltipModule.forRoot(),
    GridModule,
    LayoutModule,
    DropDownsModule,
    // ExcelExportModule,
    PagesRevoxModule,
    ProgressModule,
    ExcelModule,
  ],
  providers: [
  ],
  exports: [
    LayoutComponent,
    InputComponent,
    SelectComponent,
    DateComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    ButtonComponent,
    TextareaComponent,
    TimeComponent,
    DateComponent,
    FileComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    KudoManafileComponent,
    GridModule,
    LayoutModule,
    // ExcelExportModule,
    DropdownlistFilterComponent,
    CutStringPipe,
    SelectCustomerComponent,
    SelectIndividualComponent,
    MapByPipe,
    JsonArrayPipe,
    CurrencyFormatPipe,
    ExcelModule,
    ChipInputComponent,
  ],
  entryComponents: [
    InputComponent,
    SelectComponent,
    DateComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    ButtonComponent,
    TimeComponent,
    TextareaComponent,
    FileComponent,
    SelectCustomerComponent,
    SelectIndividualComponent,
  ],
})
export class CoreModule { }
