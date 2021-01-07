import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <div
      class="form-group form-group-default form-group-default-select2"
      [formGroup]="group">
      <label>{{field.Label}}</label>
      <pg-select
        [class.pg-select-readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent"
        [formControlName]="field.Name"
        [PlaceHolder]="field.Placeholder || ''"
        [Disabled]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent"
        [Multiple]="field.SelectMultiple"
        AllowClear
        ShowSearch>
        <pg-option
          *ngFor="let item of field.Options"
          [Label]="item"
          [Value]="item">
        </pg-option>
      </pg-select>
    </div>
  `,
  styles: [],
})
export class SelectComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
