import { AccountVM } from './account.model';
export class RoleCM {
    Name: string;
}

export class RoleUM {
    Id: string;
    Name: string;
}

export class RoleVM {
    Id: string;
    Name: string;
    Accounts: AccountVM[];
}
