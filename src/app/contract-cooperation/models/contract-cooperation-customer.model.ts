// export class Customer {
//   Id: string;
//   Address: string;
//   Building: string;
//   BusinessLicense: string;
//   BusinessLicenseDate: string;
//   BusinessLicenseTime: string;
//   Career: string;
//   Code: string;
//   CompanyType: string;
//   ContractNo: string;
//   ContractNoDateOut: string;
//   ContractNoDateRegister: string;
//   Country: string;
//   CountryType: string;
//   ObjectType: string;
//   CustomerTypeId: string;
//   DateEstablish: string;
//   DeputyGender: number;
//   DeputyMail: string;
//   DeputyName: string;
//   DeputyNation: string;
//   DeputyPosition: string;
//   DeputyTel: string;
//   Email: string;
//   Fax: string;
//   Floor: string;
//   Investment: number;
//   InvestmentCertificate: string;
//   InvestmentCertificateDate: string;
//   InvestmentCertificateTime: string;
//   MainCareer: string;
//   MarketType: string;
//   Name: string;
//   TransactionName: string;
//   No: number;
//   ProductHighlight: string;
//   Room: string;
//   ShortName: string;
//   StaffCount: number;
//   TaxCode: string;
//   Tel: string;
//   TotalInvestment: number;
//   Website: string;
//   YearEnded: string;
//   YearStarted: string;
//   Note: string;
// }

export class CustomerCM {
    Name: string;
    Address?: string;
    Country?: string;
    Tel?: string;
    Fax?: string;
    Email?: string;
    DeputyName?: string;
    DeputyPosition?: string;
    TaxCode?: string;
    BusinessLicense?: string;
    CustomerTypeId?: string;
}

export class CustomerType {
    Id: string;
    Name: string;
    Total?: number;
}

export class PagingVM {
    List: any[];
    Index: number;
    Left?: number;
    Right?: number;
    Total: number;
}

// export class IdentityCard {
//   Id: string;
//   IssueDate: string;
//   ExpireDate: string;
//   IssueAt: string;
// }

// export class BankAccount {
//   AccountNumber: string;
//   BankName: string;
// }
export class Customer {
    public Id: string; //
    public No: number; //
    public Code: string; //
    public Name: string; //
    public ShortName: string; //
    public Country: string; //
    public CountryType: string; //
    public VondieuleVND: number; //
    public VondieuleUSD: number; //
    public VondautuRegister: number; //
    public VondautuProcess: number; //
    public MarketActive: string; //
    public StartYear: string; //
    public EndYear: string; //
    public TransactionName: string; //
    public BusinessType: string; //
    public CompanyType: string; //
    public ObjectDetail: string; //
    public Carrer: string; //
    public MainCarrer: string; //
    public ProductHighlight: string;
    public Address: string; //
    public AddressProvince: string; //
    public MemberOfQuangTrungSoftware: string; //
    public Agency: string; //
    public AddressBuilding: string; //
    public AddressFloor: string; //
    public AddressRoom: string; //
    public TableTel: string; //
    public Tel: string; //
    public Fax: string; //
    public Email: string; //
    public Website: string; //
    public NumberOfInvestmentCertificate: string; //
    public DateOfIssuingInvestmentCertificate: Date; //
    public TimeOfChangeInvestmentCertificates: string; //
    public NumberOfBusinessLicense: string; //
    public DateOfIssuingBusinessLicense: Date; //
    public TimeOfChangeBusinessLicense: string; //
    public TaxCode: string; //
    public ActiveDay: Date; //
    public NumberOfActivities: string; //
    public SignDayActivities: Date; //
    public ExpirationDateActivities: Date; //
    public Note: string; //
    public ProfilePicture: string; //

    public ObjectType: Array<string>; //
    public MarketType: Array<string>; //

    public CustomerTypeId: string; //
    public IdentityCardId: string; //

    public OwnerVM: OwnerVM;
    public AmountVM: AmountVM;
    public PersonnelVM: PersonnelVM;
    public DeputyVM: DeputyVM;
}

export class DeputyVM {
    public Id: string;
    public Name: string;
    public Position: string;
    public Gender: number;
    public Birthday: Date;
    public Country: string;
    public PhoneNumber: string;
    public Email: string;
}


export class PersonnelVM {
    public Id: string;
    public TotalEmployee: number;
    public TotalEmployeeOutSide: number;
    public TotalEmployeeInSide: number;

    // [Giới tính]
    public TotalMaleEmployee: number;
    public TotalMaleEmployeeOutside: number;
    public TotalMaleEmployeeInside: number;

    public TotalFemaleEmployee: number;
    public TotalFemaleEmployeeOutside: number;
    public TotalFemaleEmployeeInside: number;

    // [Official]
    public TotalOfficialEmployee: number;
    public TotalOfficialEmployeeOutside: number;
    public TotalOfficialEmployeeInside: number;

    // [part time]
    public TotalPartTimeEmployee: number;
    public TotalPartTimeEmployeeOutside: number;
    public TotalPartTimeEmployeeInside: number;

    // [phần mềm]
    public TotalSoftwareEmployee: number;
    public TotalSoftwareEmployeeOutside: number;
    public TotalSoftwareEmployeeInside: number;

    // [khác]
    public TotalOtherEmployee: number;
    public TotalOtherEmployeeOutside: number;
    public TotalOtherEmployeeInside: number;


    public TotalInternationalEmployee: number;
    public TotalDomesticEmployee: number;

    // [trong nước]
    public TotalDomesticEmployeeOutside: number;
    public TotalDomesticEmployeeOutsideProfessor: number;
    public TotalDomesticEmployeeOutsideAssociateProfessor: number;
    public TotalDomesticEmployeeOutsidecDoctor: number;
    public TotalDomesticEmployeeOutsidecMaster: number;
    public TotalDomesticEmployeeOutsidecUniversity: number;
    public TotalDomesticEmployeeOutsidecCollege: number;
    public TotalDomesticEmployeeOutsidecIntermediate: number;
    public TotalDomesticEmployeeOutsidecOrther: number;



    public TotalDomesticEmployeeInside: number;
    public TotalDomesticEmployeeInsideProfessor: number;
    public TotalDomesticEmployeeInsideAssociateProfessor: number;
    public TotalDomesticEmployeeInsideDoctor: number;
    public TotalDomesticEmployeeInsideMaster: number;
    public TotalDomesticEmployeeInsideUniversity: number;
    public TotalDomesticEmployeeInsideCollege: number;
    public TotalDomesticEmployeeInsideIntermediate: number;
    public TotalDomesticEmployeeInsideOrther: number;

    // [quốc tế]

    public TotalInternationalEmployeeOutside: number;
    public TotalInternationalEmployeeOutsideProfessor: number;
    public TotalInternationalEmployeeOutsideAssociateProfessor: number;
    public TotalInternationalEmployeeOutsideDoctor: number;
    public TotalInternationalEmployeeOutsideMaster: number;
    public TotalInternationalEmployeeOutsideUniversity: number;
    public TotalInternationalEmployeeOutsideCollege: number;
    public TotalInternationalEmployeeOutsideIntermediate: number;
    public TotalInternationalEmployeeOutsideOrther: number;



    public TotalInternationalEmployeeInside: number;
    public TotalInternationalEmployeeInsideProfessor: number;
    public TotalInternationalEmployeeInsideAssociateProfessor: number;
    public TotalInternationalEmployeeInsideDoctor: number;
    public TotalInternationalEmployeeInsideMaster: number;
    public TotalInternationalEmployeeInsideUniversity: number;
    public TotalInternationalEmployeeInsideCollege: number;
    public TotalInternationalEmployeeInsideIntermediate: number;
    public TotalInternationalEmployeeInsideOrther: number;


    // GIANG VIEN

    public TotalLecturers: number;
    public TotalLecturersOutSide: number;
    public TotalLecturersInSide: number;

    // [Giới tính]
    public TotalMaleLecturers: number;
    public TotalMaleLecturersOutside: number;
    public TotalMaleLecturersInside: number;

    public TotalFemaleLecturers: number;
    public TotalFemaleLecturersOutside: number;
    public TotalFemaleLecturersInside: number;

    // [Official]
    public TotalOfficialLecturers: number;
    public TotalOfficialLecturersOutside: number;
    public TotalOfficialLecturersInside: number;

    // [part time]
    public TotalPartTimeLecturers: number;
    public TotalPartTimeLecturersOutside: number;
    public TotalPartTimeLecturersInside: number;

    public TotalInternationalLecturers: number;
    public TotalDomesticLecturers: number;

    // [trong nước]
    public TotalDomesticLecturersOutside: number;
    public TotalDomesticLecturersOutsideProfessor: number;
    public TotalDomesticLecturersOutsideAssociateProfessor: number;
    public TotalDomesticLecturersOutsideDoctor: number;
    public TotalDomesticLecturersOutsideMaster: number;
    public TotalDomesticLecturersOutsideUniversity: number;
    public TotalDomesticLecturersOutsideCollege: number;
    public TotalDomesticLecturersOutsideIntermediate: number;
    public TotalDomesticLecturersOutsideOrther: number;



    public TotalDomesticLecturersInside: number;
    public TotalDomesticLecturersInsideProfessor: number;
    public TotalDomesticLecturersInsideAssociateProfessor: number;
    public TotalDomesticLecturersInsideDoctor: number;
    public TotalDomesticLecturersInsideMaster: number;
    public TotalDomesticLecturersInsideUniversity: number;
    public TotalDomesticLecturersInsideCollege: number;
    public TotalDomesticLecturersInsideIntermediate: number;
    public TotalDomesticLecturersInsideOrther: number;

    // [quốc tế]

    public TotalInternationalLecturersOutside: number;
    public TotalInternationalLecturersOutsideProfessor: number;
    public TotalInternationalLecturersOutsideAssociateProfessor: number;
    public TotalInternationalLecturersOutsideDoctor: number;
    public TotalInternationalLecturersOutsideMaster: number;
    public TotalInternationalLecturersOutsideUniversity: number;
    public TotalInternationalLecturersOutsideCollege: number;
    public TotalInternationalLecturersOutsideIntermediate: number;
    public TotalInternationalLecturersOutsideOrther: number;



    public TotalInternationalLecturersInside: number;
    public TotalInternationalLecturersInsideProfessor: number;
    public TotalInternationalLecturersInsideAssociateProfessor: number;
    public TotalInternationalLecturersInsideDoctor: number;
    public TotalInternationalLecturersInsideMaster: number;
    public TotalInternationalLecturersInsideUniversity: number;
    public TotalInternationalLecturersInsideCollege: number;
    public TotalInternationalLecturersInsideIntermediate: number;
    public TotalInternationalLecturersInsideOrther: number;

    // SINH VIÊN Alumnus
    public TotalAlumnus: number;
    public TotalAlumnusOutside: number;
    public TotalAlumnusInside: number;

    public TotalSoftwareAlumnus: number;
    public TotalSoftwareAlumnusOutside: number;
    public TotalSoftwareAlumnusInside: number;

    public TotalOtherAlumnus: number;
    public TotalOtherAlumnusOutside: number;
    public TotalOtherAlumnusInside: number;

    // HỌC VIÊN
    public TotalStudent: number;
    public TotalStudentOutside: number;
    public TotalStudentInside: number;
}

export class AmountVM {
    public Id: string;

    public TotalVndRevenue: number;
    public TotalUsdRevenue: number;
    public TotalVndRevenueOutside: number;
    public TotalVndRevenueInside: number;
    public TotalUsdRevenueOutside: number;
    public TotalUsdRevenueInside: number;

    // NỘI ĐỊA
    public TotalDomesticVndRevenue: number;
    public TotalDomesticUsdRevenue: number;
    public TotalDomesticVndRevenueOutside: number;
    public TotalDomesticVndRevenueInside: number;
    public TotalDomesticUsdRevenueOutside: number;
    public TotalDomesticUsdRevenueInside: number;

    // XUẤT KHẨU
    public TotalExportVndRevenue: number;
    public TotalExportUsdRevenue: number;
    public TotalExportVndRevenueOutside: number;
    public TotalExportVndRevenueInside: number;
    public TotalExportUsdRevenueOutside: number;
    public TotalExportUsdRevenueInside: number;

    public RatioOfExportRevenue: number;
}

export class OwnerVM {
    public Id: string;
    public Name: string;
    public CompanyCode: string;
    public IssuingCompanyPlace: string;
    public IssuingCompanyDate: string;
    public AddressMainTown: string;

    public LegalRepresentativePeople: string;
    public Position: string;
    public Gender: number;
    public Birthday: string;
    public Country: string;
}
