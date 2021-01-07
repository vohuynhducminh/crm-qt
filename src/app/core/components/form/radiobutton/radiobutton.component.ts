import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <label>{{field.Label}}</label>
    <div
      class="radio radio-primary form-group"
      [formGroup]="group">
      <div
        *ngFor="let item of field.Options">
        <input
          type="radio"
          id="{{item}}"
          [formControlName]="field.Name"
          [value]="item"
          [readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent">
          <label for="{{item}}">{{item}}</label>
      </div>
    </div>
  `,
  styles: [],
})
export class RadiobuttonComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
