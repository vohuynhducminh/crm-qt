import { Role } from './role';
import { Permission } from './permission';

export class PermissionOfRole {
  Id: string;
  RoleId: string;
  PermissionId: string;
}

export class PermissionOfRoleVM {
  Id: string;
  Role: Role;
  Permission: Permission;
}

export class PermissionOfRoleCM {
  RoleId: string;
  PermissionId: string[];
}
