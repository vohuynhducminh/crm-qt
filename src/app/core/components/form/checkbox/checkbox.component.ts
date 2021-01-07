import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';

@Component({
  template: `
  <div
    class="form-group form-group-default"
    [formGroup]="group">
    <div
      class="checkbox check-success d-flex align-items-center">
      <input
        id="{{field.Name}}"
        type="checkbox"
        [formControlName]="field.Name">
        <label for="{{field.Name}}">{{field.Label}}</label>
    </div>
  </div>
  `,
  styles: [],
})
export class CheckboxComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
    if (this.group) {
      if ((this.field.FieldType && !this.field.FieldType.includes('write')) || !this.field.IsCurrent) {
        this.group.controls[this.field.Name].disable();
      }
    }
  }

}
