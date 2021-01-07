import { CommonServiceSubVM } from './common-service-sub.model';

export class CommonServiceCM {
    Name: string;
    Type: number;
}

export class CommonServiceUM {
    Id: string;
    Name: string;
    Type: number;
}

export class CommonServiceVM {
    Id: string;
    Name: string;
    Type: number;
    TelecomserviceVMs: Array<CommonServiceSubVM>;
}
