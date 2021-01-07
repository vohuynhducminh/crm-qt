import { Component, OnInit, Input } from '@angular/core';
import { FormGroupField, FormFormGroups, FormVM } from 'src/app/form/models/form';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss'],
})
export class PreviewFormComponent implements OnInit {
  _formGroups: FormGroupField[] = null;
  form: FormVM;
  @Input()
  set getFormGroups(form: FormFormGroups) {
    if (form) {
      this.formGroups(form.FormGroups);
      this.form = form.Form;
    } else {
      this.form = null;
    }
  }

  formGroups(formGroups: FormGroupField[]) {
    if (formGroups) {
      this._formGroups = formGroups;
    } else {
      this._formGroups = null;
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
