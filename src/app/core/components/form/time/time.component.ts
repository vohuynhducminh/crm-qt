import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/core/models/form-field';

@Component({
    template: `
    <div
      class="input-group date sm-m-t-10 form-group form-group-default"
      [formGroup]="group">
      <div class="form-input-group">
        <label>{{field.Label}}</label>
        <pg-timepicker
          [formControlName]="field.Name">
        </pg-timepicker>
      </div>
      <div class="input-group-append">
        <span class="input-group-text">
          <i class="pg pg-clock"></i>
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class TimeComponent implements OnInit {
  field: FormField;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
