export class Route {
  Id: string;
  Name: string;
  CurrentSubType: string;
  SubType: string;
  Commands?: RouteCommand[];
  NextSteps: any;
}

export class RouteCommand {
  Id: string;
  Command: string;
  Name: string;
}

export class RouteCM {
  CurrentInstanceId: string;
  NextInstanceId: string;
  CustomerWorkFlowId: string;
  Comment?: string;
}
