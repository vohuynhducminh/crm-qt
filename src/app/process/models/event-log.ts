export class EventLog {
  Id: string;
  Type: string;
  Name: string;
  Description: string;
  DateCreated: string;
  WorkFlowHistoryId: string;
  ActionType?: string;
  ExecutedDate?: string;
}
export class EventLogCM {
  Type: string;
  Name: string;
  Description: string;
  WorkFlowHistoryId: string;
  ActionType?: string;
  ExecutedDate?: string;
}
export class EventLogUM {
  Id: string;
  Type: string;
  Name: string;
  Description: string;
  ActionType?: string;
  ExecutedDate?: string;
}
export class EventLogFile {
  Id: string;
  Name: string;
}
