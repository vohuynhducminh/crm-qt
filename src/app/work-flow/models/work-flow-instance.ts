export class WorkFlowInstance {
  Id: string;
  WorkFlowId: string;
  FormId?: string;
  Name: string;
  Type: string;
  SubType: string;
  Description: string;
  Code?: string;
}

export class WorkFlowInstanceCM {
  WorkFlowId: string;
  Name: string;
  Type: string;
  SubType: string;
  Description: string;
}
