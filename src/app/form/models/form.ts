
export class Form {
    Id?: string;
    Name: string;
    Description: string;
    DateCreated?: string;
    Method: string;
    Formulas: FormulaField[];
    NumberToWordFields: string[];
    constructor() {
        this.Name = '';
        this.Description = '';
        this.Method = 'GET';
        this.NumberToWordFields = [];
    }
}
export class FormVM {
    Id: string;
    Name: string;
    Description: string;
    DateCreated: string;
    Method: string;
}
export class Validation {
    Name: string;
    Validator: string;
    Message: string;
}
export class FormGroupField {
    Type: string;
    Label: string;
    InputType: string;
    Name: string;
    Placeholder: string;
    DateFormat?: string;
    Class?: string[];
    InputMask?: string[];
    Options: string[];
    Validations: Validation[];
    Order: number;
    GlobalVariableId: string;
    constructor() {
        this.Type = '';
        this.Label = 'Title';
        this.InputType = null;
        this.Name = '';
        this.Placeholder = '';
        this.DateFormat = null;
        this.Class = null;
        this.Options = [];
        this.Validations = [];
        this.Order = 0;
        this.GlobalVariableId = null;
    }
}
export class FormCM {
    Form: Form;
    FormGroups: FormGroupField[];
}

export class FormFormGroups {
    Form: FormVM;
    FormGroups: FormGroupField[];
    FormData?: any;
}

export class FormUM {
    Form: FormCM;
    FormGroups: FormGroupField[];
}

export class GlobalVariableVM {
    Id: string;
    WorkflowId: string;
    Type: string;
    Name: string;
}

export class FormulaCM {
    FormulaFields: FormulaField[];
}

export class FormulaField {
    Name: string;
    Fields: string[];
}
