import { User } from './user';
import { Group } from './group';

export class GroupUser {
  Id: string;
  UserId: string;
  GroupId: string;
}

export class GroupUserVM {
  Id: string;
  User: User;
  Group: Group;
}

export class GroupUserCM {
  UserId: string;
  GroupId: string;
}
