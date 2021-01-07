import { Role } from './role';
import { Group } from './group';

export class RoleOfGroup {
  Id: string;
  RoleId: string;
  GroupId: string;
}

export class RoleOfGroupVM {
  Id: string;
  Role: Role;
  Group: Group;
}

export class RoleOfGroupCM {
  GroupId: string;
  RoleIds: string[];
}
