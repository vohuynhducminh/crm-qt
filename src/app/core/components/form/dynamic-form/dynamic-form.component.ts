import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormField } from 'src/app/core/models/form-field';
import * as moment from 'moment';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form
      class="crm-dynamic-form"
      [formGroup]="form"
      (submit)="onSubmit($event)">
      <div class="row">
        <div [class]="(field.Class ? field.Class.join(' ') : 'col-12 ') + ' px-0'" *ngFor="let field of _fields">
          <ng-container
            appDynamicField
            [field]="field"
            [group]="form"
            [inputMask]="field.InputMask"
            (fieldChange)="onChange($event)">
          </ng-container>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-cons mt-3 btn-animated from-left {{SubmitClass ? SubmitClass[0] + ' ' + SubmitClass[1] : ''}}"
        (click)="onSubmit($event)"
        *ngIf="ShowSubmit">
        <span>{{SubmitText}}</span>
      </button>
    </form>
  `,
  styles: [],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  set fields(fields: FormField[]) {
    this._fields = fields;
    if (this._fields) {
      this._fields = this._fields.sort((a, b) => {
        return a.Order - b.Order;
      });
    }
    this.form = this.createControl();
  }
  @Input()
  set formData(formData: Object) {
    this._formData = formData;
    if (this._formData && this.form) {
      this.form.patchValue(this._formData);
    }
  }
  @Input() ShowSubmit = false;
  @Input() SubmitClass = ['btn-primary', 'fa fa-paper-plane'];
  @Input() SubmitText = 'Submit';
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeHandler: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  _formData: Object;
  _fields: FormField[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  get value() {
    this.checkInput();
    console.log(this.form);
    console.log(this._fields);
    this.formatAllDate();
    return this.form.value;
  }
  checkInput() {
    const controls = Object.keys(this.form.controls);
    console.log(this.form);
    for (let i = 0; i < controls.length; i++) {
      const key = controls[i];
      const field = this._fields.find((e) => e.Name === key);
      let change = this.form.get(key).value;
      if (field.InputMask) {
        if (typeof change === 'string') {
          if (change) {
            while (change.includes('.')) {
              change = change.replace('.', '');
            }
            if (field.InputMask === 'thousandWithDecMask') {
              while (change.includes(',')) {
                change = change.replace(',', '.');
              }
            }
            this.form.get(key).setValue(field.InputMask === 'thousandWithDecMask' ? parseFloat(change) : parseInt(change, 0));
          }
        }
      }
      if (field.InputType === 'number') {
        if (typeof change === 'string') {
          this.form.get(key).setValue(parseInt(change, 0));
        }
      }
    }
  }
  createControl() {
    const group = this.fb.group({});
    this._fields.forEach(field => {
      if (field.Type === 'button') {
        return;
      }
      const control = this.fb.control(
        field.Value,
        this.bindValidations(field.Validations || [])
      );
      group.addControl(field.Name, control);
    });
    return group;
  }

  onChange(e) {
    this.changeHandler.emit(e);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.formatAllDate();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      field => {
        const control = formGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      }
    );
  }

  formatAllDate() {
    const templateData = this.parseObject(
      this.form.value,
      {
        matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
      }
    );
    this.form.patchValue(templateData);
  }
  parseObject(
    object: any,
    formatObject?: { matchFormat?: string, changeFormat?: string }
  ) {
    let finalData: any;
    if (typeof object === 'string') {
      finalData = object.trim();
      if (object.indexOf('data:image') !== -1) {
        finalData = object.split(',')[1];
      }
    } else {
      finalData = Object.assign({}, object);
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (object[key] instanceof Array) {
            finalData[key] = this.parseArray(object[key]);
          } else if (object[key] instanceof Date) {
            const x = this._fields.find(
              xxx => xxx.Name === key
            );
            finalData[key] = moment(object[key])
              .format(
                (x.DateFormat && x.DateFormat !== '') ?
                  x.DateFormat :
                  'YYYY-MM-DDTHH:mm:ss.SSSZ'
              );
          } else if (object[key] instanceof Object) {
            finalData[key] = this.parseObject(object[key]);
          } else if (typeof object[key] === 'string') {
            if (
              formatObject
              && moment(object[key], formatObject.matchFormat, true).isValid()
            ) {
              const x = this._fields.find(
                xxx => xxx.Name === key
              );
              finalData[key] = moment(object[key])
                .format(
                  x.DateFormat && x.DateFormat !== '' ?
                    x.DateFormat :
                    'YYYY-MM-DDTHH:mm:ss.SSSZ'
                );
            } else {
              finalData[key] = this.parseObject(object[key]);
            }
          }
        }
      }
    }
    return finalData;
  }

  parseArray(bigArray: Array<any>) {
    const finalData = Object.assign([], bigArray);
    for (let i = 0; i < bigArray.length; i++) {
      if (typeof bigArray[i] === 'object') {
        finalData[i] = this.parseObject(bigArray[i]);
      }
      if (typeof bigArray[i] === 'string') {
        finalData[i] = bigArray[i].trim();
        if (bigArray[i].indexOf('data:image') !== -1) {
          finalData[i] = bigArray[i].split(',')[1];
        }
      }
    }
    return finalData;
  }
}
