export class ContractVt {
    Id: string;
    ContractCode: string;
    ContractNo: string;
    DateSigned: string;
    Status: number;
    DateStart: string;
    DateEnd: string;
    CustomerId: string;
    Name: string;
    BirthDate: string;
    Phone: number;
    Email: string;
    Address: string;
    Position: string;
    Functional: string;
    Gender: string;
    Nation: string;
    Note: string;
    LocationBuild: string;
    CustomerName: string;
}
export class ContractVtAnnex {
    Type: number;
    Note: string;
    Quantity: string;
    Id: string;
    Code: string;
    Status: number;
    DateStart: string;
    DateAccept: string;
    DateEnd: string;
    ContractNo: string;
    ContractTelecomId: string;
    Services: Array<Service>;
}
export class Service {
    TelecomserviceId: string;
    UnitAmount: number;
    Data: Object;
    DateEnd: Date;
    Quantity: number;
    Note: string;
}
export class TelecomServiceModel {
    Id: string;
    Name: string;
}
