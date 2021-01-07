import { Role } from './role';
import { User } from './user';

export class RoleOfUser {
  Id: string;
  RoleId: string;
  UserId: string;
}

export class RoleOfUserVM {
  Id: string;
  Role: Role;
  User: User;
}

export class RoleOfUserCM {
  UserId: string;
  RoleIds: string[];
}
