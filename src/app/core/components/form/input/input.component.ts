import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/core/models/form-field';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  template: `<div
  class="form-group form-group-default"
  [formGroup]="group"
  *ngIf="(!field.Validations || (field.Validations && field.Validations.length === 0)) &&field.InputType.localeCompare('hidden') !== 0; else TypeHidden">
  <label>{{field.Label}}</label>
  <input
    class="form-control"
    [formControlName]="field.Name"
    [type]="field.InputType"
    [readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent"
    [textMask]="{mask: inputMask ? (oldMaskVal.includes(inputMask) ? oldMask : mask[inputMask]) : false}">
</div>
<div *ngIf="field.Validations && field.Validations.length > 0">
  <div
    class="form-group form-group-default required"
    [formGroup]="group"
    [class.has-error]="getFormControl(field.Name).invalid
      && (getFormControl(field.Name).dirty
      || getFormControl(field.Name).touched)">
    <label>{{field.Label}}</label>
    <input
      class="form-control"
      [formControlName]="field.Name"
      [type]="field.InputType"
      [readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent"
      [textMask]="{mask: inputMask ? (oldMaskVal.includes(inputMask) ? oldMask : mask[inputMask]) : false}"
      required>
  </div>
  <div
    *ngIf="getFormControl(field.Name).invalid
      && (getFormControl(field.Name).dirty
      || getFormControl(field.Name).touched)">
    <label class="error">
      This field is required.
    </label>
  </div>
</div>

<ng-template  #TypeHidden>
  <span *ngIf='(!field.Validations || (field.Validations && field.Validations.length === 0))' [formGroup]="group">
    <input
      class="form-control"
      [formControlName]="field.Name"
      [type]="field.InputType"
      [readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent">
  </span>
</ng-template>`,
  styles: [],
})
export class InputComponent implements OnInit {
  inputMask: string;
  defaultValue: string;
  field: FormField;
  group: FormGroup;

  oldMaskVal = ['money', 'area'];
  oldMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });

  mask = {
    thousandOnlyMask: createNumberMask({
      prefix: '',
      suffix: '',
      thousandsSeparatorSymbol: '.',
      allowDecimal: false,
    }),
    // tel: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    thousandWithDecMask: createNumberMask({
      prefix: '',
      suffix: '',
      thousandsSeparatorSymbol: '.',
      allowDecimal: true,
      decimalSymbol: ',',
    }),
    // matchAll: [/^[a-z]*$/],
  };
  constructor() { }

  ngOnInit() {
    // console.log(this.field);
    // console.log(this.field.Validations && this.field.Validations.length);
    // console.log(!(this.field.Validations) && this.field.InputType.localeCompare('hidden') !== 0);
  }

  getFormControl(name: string) {
    return this.group.controls[ name ];
  }
  setDefaultValue() {
    if (this.defaultValue && this.defaultValue !== '') {
      console.log(this.defaultValue);
      this.group.get(this.field.Name).patchValue(this.defaultValue);
    }
  }

  inputMaskCheck() {
    if (this.inputMask && this.inputMask.trim() === '') {
      this.inputMask = null;
    }
  }
}
