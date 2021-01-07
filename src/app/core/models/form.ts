import { FormField, FormFieldCM } from './form-field';

export class Form {
  Id?: string;
  Name: string;
  Description: string;
  DateCreated?: string;
  Method: string;
}

export class FormResponse {
  Form: Form;
  FormGroups: FormField[];
  FormData?: Object;
}

export class FormCM {
  Form: Form;
  FormGroups: FormFieldCM[];
}
