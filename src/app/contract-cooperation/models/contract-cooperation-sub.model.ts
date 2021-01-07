export class ContractCooperationSub {
    Id: string;
    Code: string;
    CustomerId: string;
    CooperationContractId: string;
    Type: number;
    DateStart: Date;
    DateEnd: Date;
    Status: number;
    Note: string;
    Services: ContractCooperationSubServiceItem[];
}

export class ContractCooperationSubServiceItem {
    Id: string;
    CoContractTelServiceId: string;
    Amount: number;
}
