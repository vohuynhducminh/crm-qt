import { Customer } from './customer';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { History } from 'src/app/process/models/history';

export class CustomerWorkFlow {
  Id: string;
  WorkFlow: WorkFlow;
  Customer: Customer;
  StartDate: string;
  CurrentProcesses: History[];
}

export class CustomerWorkFlowVM {
  Id: string;
  Customer: Customer;
  WorkFlow: WorkFlow;
}

export class CustomerWorkFlowCM {
  CustomerId?: string;
  WorkFlowId: string;
}
