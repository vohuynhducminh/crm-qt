import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
    <div
      class="form-group form-group-default"
      [formGroup]="group">
      <label>{{field.Label}}</label>
      <textarea
        class="form-control"
        rows="4"
        [formControlName]="field.Name"
        [readonly]="(field.FieldType && !field.FieldType.includes('write')) || !field.IsCurrent">
      </textarea>
    </div>
  `,
  styles: [
    `
      textarea {
        resize: none;
      }
    `,
  ],
})
export class TextareaComponent implements OnInit {
  field: FormField;
  group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
