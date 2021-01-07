import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/core/models/form-field';

@Component({
  template: `
    <div
      class="form-group"
      [formGroup]="group">
      <button
        class="btn btn-primary"
        type="submit">
        {{field.Label}}
      </button>
    </div>
  `,
  styles: [],
})
export class ButtonComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
