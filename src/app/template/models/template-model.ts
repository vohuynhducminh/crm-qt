export class TemplateVM {
    Id: string;
    Name: string;
    Path: string;
    Date: string;
}

export class WorkFlowInstanceVM {
    Id: string;
    Code?: string;
    WorkFlowId: string;
    Name: string;
    Type: string;
    SubType: string;
    Description?: string;
}

export class TemplateCM {
    Id: string;
    Fields: string[];
}
