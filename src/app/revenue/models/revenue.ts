export class Revenue {
    CustomerCode: string;
    CompanyName: string;
    MonthDatas: MonthData[];
}

export class MonthData {
    TotalRevenue: Number;
    Increase: Number;
}
