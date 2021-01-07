import {
  Directive,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';

// import all field components
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormField } from 'src/app/core/models/form-field';
import { TextareaComponent } from '../textarea/textarea.component';
import { TimeComponent } from '../time/time.component';
import { FileComponent } from '../file/file.component';
import { SelectCustomerComponent } from '../select-customer/select-customer.component';
import { SelectIndividualComponent } from '../select-individual/select-individual.component';

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FormField;
  @Input() group: FormGroup;
  @Input() inputMask: string;
  @Input() defaultValue: string;
  @Output() fieldChange: EventEmitter<any> = new EventEmitter<any>();
  componentRef: any;

  componentMapper = {
    'input': InputComponent,
    'button': ButtonComponent,
    'select': SelectComponent,
    'date': DateComponent,
    'time': TimeComponent,
    'radiobutton': RadiobuttonComponent,
    'checkbox': CheckboxComponent,
    'textarea': TextareaComponent,
    'file': FileComponent,
    'select-customer': SelectCustomerComponent,
    'select-individual': SelectIndividualComponent,
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    // console.log(this.group);
    // console.log(this.field);
    const factory = this.resolver.resolveComponentFactory(
      this.componentMapper[this.field.Type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.fieldChange = this.fieldChange;
     this.componentRef.instance.inputMask = this.inputMask;
    this.componentRef.instance.defaultValue = this.defaultValue;
  }

}
