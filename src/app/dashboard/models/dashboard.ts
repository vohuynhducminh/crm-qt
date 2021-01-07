export class TotalInvestor {
    Year: string;
    Total: number;
    TotalDomestic: number;
    TotalInternational: number;
}
export class TotalSoftware {
    Year: string;
    Total: number;
    TotalDomestic: number;
    TotalInternational: number;
}
export class TotalInsideOutsideSoftware {
    Year: string;
    Total: number;
    TotalInside: number;
    TotalOutside: number;
}
export class TotalPeople {
    Year: string;
    Total: number;
    TotalEmployee: number;
    TotalAlumnus: number;
}
export class VondautuInvestor {
    Year: string;
    VondautuRegister: number;
}
export class VondautuSoftware {
    Year: string;
    VondautuRegister: number;
}

export class TopRevenue {
    TotalVndRevenueVMs: { Name: string, TotalVndRevenue: number }[];
    NumberOfCustomer: number;
}

export class TopIncome {
    // TotalVndRevenueVMs: { Name: string, TotalVndRevenue: number }[];
    // NumberOfCustomer: number;
    CompanyName: string;
    CustomerCode: string;
    RevenueYear: any;
}

export class ObjectType {
    MarketType: string;
    Total: number;
}

export class MarketType {
    MarketType: string;
    Total: number;
}
export class ParticipantsInMonth {
    Customers: [];
    NumberOfCustomer: number;
}

export class Contract {
    Name: string;
    ContractNo: number;
    EndDate: Date;
}
export class GetCompleteRate {
    Id: string;
    Name: string;
    ImplementRevenue: number;
    RevenueRegister: number;
    Services: Array<GetCompleteRate>;
}

export class TelecommunicationRevenue {
    CommonTelecomservice: string;
    ImplementRevenue: number;
}

export class TreeTabelModel {
    data: {
        Name: string;
        Id: string;
        ImplementRevenue: number;
        RevenueRegister: number;
    };
    children: Array<TreeTabelModel>;
}
export class CompanyStatisticsInQTSCModel {
    Country: string;
    Total: number;
}
export class CalculateRevenueStatisticsModel {
    revenue: number[];
    squareInfrastructure: number[];
    squareUtilities: number[];
    electricityWater: number[];
}
export class DashboardAccess {
    BusinessAccess?: {
        VondautuInvestorAccess: boolean,
        VondautuSoftwareAccess: boolean,
        TotalSoftwareAccess: boolean,
        TotalPeopleAccess: boolean,
        CustomerAccess: boolean,
        MarketAccess: boolean,
        ITCompanyAccess: boolean,
        DeputyAccess: boolean,
    };
    MarketAccess?: {
        TopRevenueAccess: boolean,
        ParticipantsInMonthAccess: boolean,
        ContractAccess: boolean,
        RevenueAccess: boolean,
        OfficeInventoryAccess: boolean
    };
    TelecommAccess?: {
        CompleteRateAccess: boolean,
        ProportionOfTelecommunicationRevenueAccess: boolean,
        ProportionOfParentTelecommunicationRevenueAccess: boolean,
        ProportionOfTelecommunicationRevenueInsideOutsideChartAccess: boolean,
        IncreaseRateAccess: boolean,
        IncreaseRateOutSideAccess: boolean,
    };
    constructor() {
        this.BusinessAccess = {
            CustomerAccess: true,
            DeputyAccess: true,
            ITCompanyAccess: true,
            MarketAccess: true,
            TotalPeopleAccess: true,
            TotalSoftwareAccess: true,
            VondautuInvestorAccess: true,
            VondautuSoftwareAccess: true,
        };
        this.MarketAccess = {
            ContractAccess: true,
            OfficeInventoryAccess: true,
            ParticipantsInMonthAccess: true,
            RevenueAccess: true,
            TopRevenueAccess: true,
        };
        this.TelecommAccess = {
            CompleteRateAccess: true,
            IncreaseRateAccess: true,
            IncreaseRateOutSideAccess: true,
            ProportionOfParentTelecommunicationRevenueAccess: true,
            ProportionOfTelecommunicationRevenueAccess: true,
            ProportionOfTelecommunicationRevenueInsideOutsideChartAccess: true,
        };
    }

}

export class BuildingInventory {
    Name: string;
    UsedSquare: number;
    UnusedSquare: number;
}
