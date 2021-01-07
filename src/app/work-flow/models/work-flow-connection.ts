import { WorkFlowInstance } from './work-flow-instance';

export class WorkFlowConnection {
  Id: string;
  FromInstanceId: string;
  ToInstanceId: string;
  Type: string;
  Command: string;
}

export class WorkFlowConnectionVM {
  Id: string;
  Type: string;
  Command: string;
  FromInstance: WorkFlowInstance;
  ToInstance: WorkFlowInstance;
}

export class WorkFlowConnectionCM {
  FromInstanceId: string;
  ToInstanceId: string;
  Type: string;
  Command: string;
}
