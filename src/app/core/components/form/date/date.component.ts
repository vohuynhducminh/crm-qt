import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <div
      class="input-group date p-l-0 form-group form-group-default"
      id="datePicker-{{field.Name}}"
      [formGroup]="group">
      <div class="form-input-group">
        <label>{{field.Label}}</label>
        <pg-datepicker
          [Placeholder]="''"
          (blur)="scroll()"
          [autoScroll]="true"
          [Disabled]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent"
          [formControlName]="field.Name"
          [Format]="'DD/MM/YYYY'">
        </pg-datepicker>
      </div>
      <div class="input-group-append">
        <span class="input-group-text">
          <i class="fa fa-calendar"></i>
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class DateComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }
  scroll() {
    document.getElementById('datePicker-' + this.field.Name).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
