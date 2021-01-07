import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Customer, CustomerType } from 'src/app/customer/models/customer';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  checkAccess = (group: string, attribute: string): boolean => {
    const access_roles = environment.access_roles; // Bên environtment
    const { roles } = JSON.parse(localStorage.getItem("CRM_TOKEN")); // token
    const canActive: string[] = [];
    for (let index = 0; index < access_roles.length; index++) {
      const access_role = access_roles[index];
      if (roles.indexOf(access_role.name) > -1) {
        const obj = access_role.data[group]; // dashboard
        const check = obj[attribute]; // showCVPMQT
        if (check) {
          canActive.push(attribute);
        }
      }
    }    
    return canActive.length > 0;
  };
  @ViewChild('updateCustomerSuccessSwal') private updateCustomerSuccessSwal: SwalComponent;
  @ViewChild('updateCustomerErrorSwal') private updateCustomerErrorSwal: SwalComponent;
  @ViewChild('deleteCustomerSuccessSwal') private deleteCustomerSuccessSwal: SwalComponent;
  @ViewChild('deleteCustomerFailSwal') private deleteCustomerFailSwal: SwalComponent;
  @Input()
  set Customer(customer: Customer) {
    this.customer = customer;
    if (this.customer) {
      this.initFormGroup();
    } else {
      this.form = null;
    }
    this.isUpdate = false;
  }
  @Input() currentCustomer: Customer;
  @Input() typeShow: string;
  isUpdate = false;
  customer: Customer;

  currencyMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalLimit: 3,
    decimalSymbol: ',',
  });

  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });

  percentageMask = createNumberMask({
    prefix: '',
    suffix: '%',
    thousandsSeparatorSymbol: ',',
    integerLimit: 2,
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
  });

  form: FormGroup;
  countriesList: string[] = [
    'Afghanistan',
    'Ai Cập',
    'Albania',
    'Algérie',
    'Andorra',
    'Angola',
    'Vương quốc Liên hiệp Anh và Bắc Ireland',
    'Antigua và Barbuda',
    'Áo',
    'Ả Rập Xê Út',
    'Argentina',
    'Armenia',
    'Azerbaijan',
    'Ấn Độ',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belize',
    'Bénin',
    'Bhutan',
    'Bỉ',
    'Bolivia',
    'Bosna và Hercegovina',
    'Botswana',
    'Bồ Đào Nha',
    'Bờ Biển Ngà',
    'Brasil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Các Tiểu Vương quốc Ả Rập Thống nhất',
    'Cameroon',
    'Campuchia',
    'Canada',
    'Chile',
    'Colombia',
    'Comoros',
    'Cộng hòa Congo',
    'Cộng hòa Dân chủ Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Djibouti',
    'Dominica',
    'Cộng hòa Dominica',
    'Đan Mạch',
    'Đông Timor',
    'Đức',
    'Ecuador',
    'El Salvador',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Gabon',
    'Gambia',
    'Ghana',
    'Grenada',
    'Gruzia',
    'Guatemala',
    'Guiné-Bissau',
    'Guinea Xích Đạo',
    'Guinée',
    'Guyana',
    'Haiti',
    'Hà Lan',
    'Hàn Quốc',
    'Hoa Kỳ',
    'Honduras',
    'Hungary',
    'Hy Lạp',
    'Iceland',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Jamaica',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Lào',
    'Latvia',
    'Lesotho',
    'Liban',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Litva',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malaysia',
    'Mali',
    'Malta',
    'Maroc',
    'Quần đảo Marshall',
    'Mauritanie',
    'Mauritius',
    'México',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mông Cổ',
    'Montenegro',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nam Sudan',
    'Nam Phi',
    'Nauru',
    'Na Uy',
    'Nepal',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Nga',
    'Nhật Bản',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Pháp',
    'Phần Lan',
    'Philippines',
    'Qatar',
    'România',
    'Rwanda',
    'Saint Kitts và Nevis',
    'Saint Lucia',
    'Saint Vincent và Grenadines',
    'Samoa',
    'San Marino',
    'São Tomé và Príncipe',
    'Séc',
    'Sénégal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Síp',
    'Slovakia',
    'Slovenia',
    'Solomon',
    'Somalia',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Tây Ban Nha',
    'Tchad',
    'Thái Lan',
    'Thổ Nhĩ Kỳ',
    'Thụy Điển',
    'Thụy Sĩ',
    'Togo',
    'Tonga',
    'Triều Tiên',
    'Trinidad và Tobago',
    'Trung Quốc',
    'Trung Phi',
    'Tunisia',
    'Turkmenistan',
    'Tuvalu',
    'Úc',
    'Uganda',
    'Ukraina',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican',
    'Venezuela',
    'Việt Nam',
    'Ý',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  citiesList: string[] = [
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Bình Định',
    'Bạc Liêu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bắc Ninh',
    'Bến Tre',
    'Cao Bằng',
    'Cà Mau',
    'Cần Thơ',
    'Gia Lai',
    'Hoà Bình',
    'Hà Giang',
    'Hà Nam',
    'Hà Nội',
    'Hà Tĩnh',
    'Hưng Yên',
    'Hải Dương',
    'Hải Phòng',
    'Hậu Giang',
    'Hồ Chí Minh',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Long An',
    'Lào Cai',
    'Lâm Đồng',
    'Lạng Sơn',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Thanh Hóa',
    'Thái Bình',
    'Thái Nguyên',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Tây Ninh',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
    'Điện Biên',
    'Đà Nẵng',
    'Đắk Lắk',
    'Đắk Nông',
    'Đồng Nai',
    'Đồng Tháp',
  ];

  customerTypeList: CustomerType[];
  disableSubmit = false;
  duplicated: any = {};

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    public authService: AuthGuardService
  ) { }

  ngOnInit() {
    this.getCustomerType();
  }

  initFormGroup() {
    this.form = this.formBuilder.group({
      Name: new FormControl(this.customer.Name, [Validators.required]),
      ShortName: new FormControl(this.customer.ShortName),
      Country: new FormControl(this.customer.Country),
      CountryType: new FormControl(this.customer.CountryType),
      MarketActive: new FormControl(this.customer.MarketActive),
      MarketType: new FormControl(this.customer.MarketType),
      VondieuleVND: new FormControl(this.customer.VondieuleVND),
      VondieuleUSD: new FormControl(this.customer.VondieuleUSD),
      VondautuRegister: new FormControl(this.customer.VondautuRegister),
      VondautuProcess: new FormControl(this.customer.VondautuProcess),
      StartYear: new FormControl(this.customer.StartYear),
      EndYear: new FormControl(this.customer.EndYear),
      CustomerTypeId: new FormControl(this.customer.CustomerTypeId),
      IdentityCardId: new FormControl(this.customer.IdentityCardId),
      TransactionName: new FormControl(this.customer.TransactionName),
      CompanyType: new FormControl(this.customer.CompanyType),
      BusinessType: new FormControl(this.customer.BusinessType),
      ObjectDetail: new FormControl(this.customer.ObjectDetail),
      ObjectType: new FormControl(this.customer.ObjectType),
      Carrer: new FormControl(this.customer.Carrer),
      MainCarrer: new FormControl(this.customer.MainCarrer),
      ProductHighlight: new FormControl(this.customer.ProductHighlight),
      Address: new FormControl(this.customer.Address),
      AddressProvince: new FormControl(this.customer.AddressProvince),
      MemberOfQuangTrungSoftware: new FormControl(this.customer.MemberOfQuangTrungSoftware),
      Agency: new FormControl(this.customer.Agency),
      AddressBuilding: new FormControl(this.customer.AddressBuilding),
      AddressFloor: new FormControl(this.customer.AddressFloor),
      AddressRoom: new FormControl(this.customer.AddressRoom),
      TableTel: new FormControl(this.customer.TableTel),
      Tel: new FormControl(this.customer.Tel),
      Fax: new FormControl(this.customer.Fax),
      Email: new FormControl(this.customer.Email),
      Website: new FormControl(this.customer.Website),
      NumberOfInvestmentCertificate: new FormControl(this.customer.NumberOfInvestmentCertificate),
      DateOfIssuingInvestmentCertificate: new FormControl(this.customer.DateOfIssuingInvestmentCertificate),
      TimeOfChangeInvestmentCertificates: new FormControl(this.customer.TimeOfChangeInvestmentCertificates),
      NumberOfBusinessLicense: new FormControl(this.customer.NumberOfBusinessLicense),
      DateOfIssuingBusinessLicense: new FormControl(this.customer.DateOfIssuingBusinessLicense),
      TimeOfChangeBusinessLicense: new FormControl(this.customer.TimeOfChangeBusinessLicense),
      NumberOfActivities: new FormControl(this.customer.NumberOfActivities),
      SignDayActivities: new FormControl(this.customer.SignDayActivities),
      ExpirationDateActivities: new FormControl(this.customer.ExpirationDateActivities),
      TaxCode: new FormControl(this.customer.TaxCode),
      ActiveDay: new FormControl(this.customer.ActiveDay),
      DeputyUM: new FormGroup({
        Id: new FormControl(this.customer.DeputyVM.Id),
        Name: new FormControl(this.customer.DeputyVM.Name),
        Position: new FormControl(this.customer.DeputyVM.Position),
        Gender: new FormControl(this.customer.DeputyVM.Gender),
        Birthday: new FormControl(this.customer.DeputyVM.Birthday),
        Country: new FormControl(this.customer.DeputyVM.Country),
        PhoneNumber: new FormControl(this.customer.DeputyVM.PhoneNumber),
        Email: new FormControl(this.customer.DeputyVM.Email),
      }),
      OwnerUM: new FormGroup({
        Id: new FormControl(this.customer.OwnerVM.Id),
        Name: new FormControl(this.customer.OwnerVM.Name),
        CompanyCode: new FormControl(this.customer.OwnerVM.CompanyCode),
        Position: new FormControl(this.customer.OwnerVM.Position),
        IssuingCompanyPlace: new FormControl(this.customer.OwnerVM.IssuingCompanyPlace),
        IssuingCompanyDate: new FormControl(this.customer.OwnerVM.IssuingCompanyDate),
        AddressMainTown: new FormControl(this.customer.OwnerVM.AddressMainTown),
        LegalRepresentativePeople: new FormControl(this.customer.OwnerVM.LegalRepresentativePeople),
        Gender: new FormControl(this.customer.OwnerVM.Gender),
        Birthday: new FormControl(this.customer.OwnerVM.Birthday),
        Country: new FormControl(this.customer.OwnerVM.Country),
      }),
      AmountUM: new FormGroup({
        Id: new FormControl(this.customer.AmountVM.Id),

        TotalVndRevenue: new FormControl(this.customer.AmountVM.TotalVndRevenue),
        TotalUsdRevenue: new FormControl(this.customer.AmountVM.TotalUsdRevenue),
        TotalVndRevenueOutside: new FormControl(this.customer.AmountVM.TotalVndRevenueOutside),
        TotalVndRevenueInside: new FormControl(this.customer.AmountVM.TotalVndRevenueInside),
        TotalUsdRevenueOutside: new FormControl(this.customer.AmountVM.TotalUsdRevenueOutside),
        TotalUsdRevenueInside: new FormControl(this.customer.AmountVM.TotalUsdRevenueInside),

        TotalDomesticVndRevenue: new FormControl(this.customer.AmountVM.TotalDomesticVndRevenue),
        TotalDomesticUsdRevenue: new FormControl(this.customer.AmountVM.TotalDomesticUsdRevenue),
        TotalDomesticVndRevenueOutside: new FormControl(this.customer.AmountVM.TotalDomesticVndRevenueOutside),
        TotalDomesticVndRevenueInside: new FormControl(this.customer.AmountVM.TotalDomesticVndRevenueInside),
        TotalDomesticUsdRevenueOutside: new FormControl(this.customer.AmountVM.TotalDomesticUsdRevenueOutside),
        TotalDomesticUsdRevenueInside: new FormControl(this.customer.AmountVM.TotalDomesticUsdRevenueInside),

        TotalExportVndRevenue: new FormControl(this.customer.AmountVM.TotalExportVndRevenue),
        TotalExportUsdRevenue: new FormControl(this.customer.AmountVM.TotalExportUsdRevenue),
        TotalExportVndRevenueOutside: new FormControl(this.customer.AmountVM.TotalExportVndRevenueOutside),
        TotalExportVndRevenueInside: new FormControl(this.customer.AmountVM.TotalExportVndRevenueInside),
        TotalExportUsdRevenueOutside: new FormControl(this.customer.AmountVM.TotalExportUsdRevenueOutside),
        TotalExportUsdRevenueInside: new FormControl(this.customer.AmountVM.TotalExportUsdRevenueInside),

        RatioOfExportRevenue: new FormControl(this.customer.AmountVM.RatioOfExportRevenue),
      }),
      PersonnelUM: new FormGroup({
        Id: new FormControl(this.customer.PersonnelVM.Id),

        TotalEmployee: new FormControl(this.customer.PersonnelVM.TotalEmployee),
        TotalEmployeeOutSide: new FormControl(this.customer.PersonnelVM.TotalEmployeeOutSide),
        TotalEmployeeInSide: new FormControl(this.customer.PersonnelVM.TotalEmployeeInSide),

        TotalMaleEmployee: new FormControl(this.customer.PersonnelVM.TotalMaleEmployee),
        TotalMaleEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalMaleEmployeeOutside),
        TotalMaleEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalMaleEmployeeInside),

        TotalFemaleEmployee: new FormControl(this.customer.PersonnelVM.TotalFemaleEmployee),
        TotalFemaleEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalFemaleEmployeeOutside),
        TotalFemaleEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalFemaleEmployeeInside),

        TotalOfficialEmployee: new FormControl(this.customer.PersonnelVM.TotalOfficialEmployee),
        TotalOfficialEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalOfficialEmployeeOutside),
        TotalOfficialEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalOfficialEmployeeInside),

        TotalPartTimeEmployee: new FormControl(this.customer.PersonnelVM.TotalPartTimeEmployee),
        TotalPartTimeEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalPartTimeEmployeeOutside),
        TotalPartTimeEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalPartTimeEmployeeInside),

        TotalSoftwareEmployee: new FormControl(this.customer.PersonnelVM.TotalSoftwareEmployee),
        TotalSoftwareEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalSoftwareEmployeeOutside),
        TotalSoftwareEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalSoftwareEmployeeInside),

        TotalOtherEmployee: new FormControl(this.customer.PersonnelVM.TotalOtherEmployee),
        TotalOtherEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalOtherEmployeeOutside),
        TotalOtherEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalOtherEmployeeInside),

        TotalInternationalEmployee: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployee),
        TotalDomesticEmployee: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployee),

        TotalDomesticEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutside),
        TotalDomesticEmployeeOutsideProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsideProfessor),
        TotalDomesticEmployeeOutsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsideAssociateProfessor),
        TotalDomesticEmployeeOutsidecDoctor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecDoctor),
        TotalDomesticEmployeeOutsidecMaster: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecMaster),
        TotalDomesticEmployeeOutsidecUniversity: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecUniversity),
        TotalDomesticEmployeeOutsidecCollege: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecCollege),
        TotalDomesticEmployeeOutsidecIntermediate: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecIntermediate),
        TotalDomesticEmployeeOutsidecOrther: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeOutsidecOrther),

        TotalDomesticEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInside),
        TotalDomesticEmployeeInsideProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideProfessor),
        TotalDomesticEmployeeInsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideAssociateProfessor),
        TotalDomesticEmployeeInsideDoctor: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideDoctor),
        TotalDomesticEmployeeInsideMaster: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideMaster),
        TotalDomesticEmployeeInsideUniversity: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideUniversity),
        TotalDomesticEmployeeInsideCollege: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideCollege),
        TotalDomesticEmployeeInsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideIntermediate),
        TotalDomesticEmployeeInsideOrther: new FormControl(this.customer.PersonnelVM.TotalDomesticEmployeeInsideOrther),

        TotalInternationalEmployeeOutside: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutside),
        TotalInternationalEmployeeOutsideProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideProfessor),
        TotalInternationalEmployeeOutsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideAssociateProfessor),
        TotalInternationalEmployeeOutsideDoctor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideDoctor),
        TotalInternationalEmployeeOutsideMaster: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideMaster),
        TotalInternationalEmployeeOutsideUniversity: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideUniversity),
        TotalInternationalEmployeeOutsideCollege: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideCollege),
        TotalInternationalEmployeeOutsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideIntermediate),
        TotalInternationalEmployeeOutsideOrther: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeOutsideOrther),

        TotalInternationalEmployeeInside: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInside),
        TotalInternationalEmployeeInsideProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideProfessor),
        TotalInternationalEmployeeInsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideAssociateProfessor),
        TotalInternationalEmployeeInsideDoctor: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideDoctor),
        TotalInternationalEmployeeInsideMaster: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideMaster),
        TotalInternationalEmployeeInsideUniversity: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideUniversity),
        TotalInternationalEmployeeInsideCollege: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideCollege),
        TotalInternationalEmployeeInsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideIntermediate),
        TotalInternationalEmployeeInsideOrther: new FormControl(this.customer.PersonnelVM.TotalInternationalEmployeeInsideOrther),

        TotalLecturers: new FormControl(this.customer.PersonnelVM.TotalLecturers),
        TotalLecturersOutSide: new FormControl(this.customer.PersonnelVM.TotalLecturersOutSide),
        TotalLecturersInSide: new FormControl(this.customer.PersonnelVM.TotalLecturersInSide),

        TotalMaleLecturers: new FormControl(this.customer.PersonnelVM.TotalMaleLecturers),
        TotalMaleLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalMaleLecturersOutside),
        TotalMaleLecturersInside: new FormControl(this.customer.PersonnelVM.TotalMaleLecturersInside),

        TotalFemaleLecturers: new FormControl(this.customer.PersonnelVM.TotalFemaleLecturers),
        TotalFemaleLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalFemaleLecturersOutside),
        TotalFemaleLecturersInside: new FormControl(this.customer.PersonnelVM.TotalFemaleLecturersInside),

        TotalOfficialLecturers: new FormControl(this.customer.PersonnelVM.TotalOfficialLecturers),
        TotalOfficialLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalOfficialLecturersOutside),
        TotalOfficialLecturersInside: new FormControl(this.customer.PersonnelVM.TotalOfficialLecturersInside),

        TotalPartTimeLecturers: new FormControl(this.customer.PersonnelVM.TotalPartTimeLecturers),
        TotalPartTimeLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalPartTimeLecturersOutside),
        TotalPartTimeLecturersInside: new FormControl(this.customer.PersonnelVM.TotalPartTimeLecturersInside),

        TotalInternationalLecturers: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturers),
        TotalDomesticLecturers: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturers),

        TotalDomesticLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutside),
        TotalDomesticLecturersOutsideProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideProfessor),
        TotalDomesticLecturersOutsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideAssociateProfessor),
        TotalDomesticLecturersOutsideDoctor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideDoctor),
        TotalDomesticLecturersOutsideMaster: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideMaster),
        TotalDomesticLecturersOutsideUniversity: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideUniversity),
        TotalDomesticLecturersOutsideCollege: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideCollege),
        TotalDomesticLecturersOutsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideIntermediate),
        TotalDomesticLecturersOutsideOrther: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersOutsideOrther),

        TotalDomesticLecturersInside: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInside),
        TotalDomesticLecturersInsideProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideProfessor),
        TotalDomesticLecturersInsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideAssociateProfessor),
        TotalDomesticLecturersInsideDoctor: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideDoctor),
        TotalDomesticLecturersInsideMaster: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideMaster),
        TotalDomesticLecturersInsideUniversity: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideUniversity),
        TotalDomesticLecturersInsideCollege: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideCollege),
        TotalDomesticLecturersInsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideIntermediate),
        TotalDomesticLecturersInsideOrther: new FormControl(this.customer.PersonnelVM.TotalDomesticLecturersInsideOrther),

        TotalInternationalLecturersOutside: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutside),
        TotalInternationalLecturersOutsideProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideProfessor),
        TotalInternationalLecturersOutsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideAssociateProfessor),
        TotalInternationalLecturersOutsideDoctor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideDoctor),
        TotalInternationalLecturersOutsideMaster: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideMaster),
        TotalInternationalLecturersOutsideUniversity: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideUniversity),
        TotalInternationalLecturersOutsideCollege: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideCollege),
        TotalInternationalLecturersOutsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideIntermediate),
        TotalInternationalLecturersOutsideOrther: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersOutsideOrther),

        TotalInternationalLecturersInside: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInside),
        TotalInternationalLecturersInsideProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideProfessor),
        TotalInternationalLecturersInsideAssociateProfessor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideAssociateProfessor),
        TotalInternationalLecturersInsideDoctor: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideDoctor),
        TotalInternationalLecturersInsideMaster: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideMaster),
        TotalInternationalLecturersInsideUniversity: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideUniversity),
        TotalInternationalLecturersInsideCollege: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideCollege),
        TotalInternationalLecturersInsideIntermediate: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideIntermediate),
        TotalInternationalLecturersInsideOrther: new FormControl(this.customer.PersonnelVM.TotalInternationalLecturersInsideOrther),

        TotalAlumnus: new FormControl(this.customer.PersonnelVM.TotalAlumnus),
        TotalAlumnusOutside: new FormControl(this.customer.PersonnelVM.TotalAlumnusOutside),
        TotalAlumnusInside: new FormControl(this.customer.PersonnelVM.TotalAlumnusInside),

        TotalSoftwareAlumnus: new FormControl(this.customer.PersonnelVM.TotalSoftwareAlumnus),
        TotalSoftwareAlumnusOutside: new FormControl(this.customer.PersonnelVM.TotalSoftwareAlumnusOutside),
        TotalSoftwareAlumnusInside: new FormControl(this.customer.PersonnelVM.TotalSoftwareAlumnusInside),

        TotalOtherAlumnus: new FormControl(this.customer.PersonnelVM.TotalOtherAlumnus),
        TotalOtherAlumnusOutside: new FormControl(this.customer.PersonnelVM.TotalOtherAlumnusOutside),
        TotalOtherAlumnusInside: new FormControl(this.customer.PersonnelVM.TotalOtherAlumnusInside),

        TotalStudent: new FormControl(this.customer.PersonnelVM.TotalStudent),
        TotalStudentOutside: new FormControl(this.customer.PersonnelVM.TotalStudentOutside),
        TotalStudentInside: new FormControl(this.customer.PersonnelVM.TotalStudentInside),
      }),
      Note: new FormControl(this.customer.Note),
      ProfilePicture: new FormControl(this.customer.ProfilePicture),
    }, {
      // tslint:disable-next-line: no-use-before-declare
      validator: DuplicatedValidation.isDuplicated.bind(this, this),
    });
    this.disableForm();
  }

  enableForm() {
    if (this.form) {
      this.form.enable();
    }
  }

  disableForm() {
    if (this.form) {
      this.form.disable();
    }
  }

  updateCustomer() {
    const name = this.form.controls['Name'].value;
    const tel = this.form.controls['Tel'].value;
    const tableTel = this.form.controls['TableTel'].value;
    const email = this.form.controls['Email'].value;
    if (name && (tableTel || tel || email) && !this.duplicated['Name'] && !this.duplicated['TaxCode']) {
      // let value = this.form.value;
      // value = this.globalService.parseObjectToJson(value);
      const cus: Customer = { ...this.form.value };
      cus.Id = this.customer.Id;
      for (const key in cus) {
        if (cus.hasOwnProperty(key)) {
          if (key.includes('Vondieule') || key.includes('Vondautu')) {
            let flag = cus[key] + '';
            flag = flag.split('.').join('');
            cus[key] = parseInt(flag, 0);
          } else if (key === 'AmountUM' || key === 'PersonnelUM') {
            for (const k in cus[key]) {
              if (cus[key].hasOwnProperty(k)) {
                if (k === 'RatioOfExportRevenue') {
                  let flagChild = cus[key][k] + '';
                  flagChild = flagChild.split('%').join('');
                  cus[key][k] = parseInt(flagChild, 0);
                }
                if (k.includes('Total')) {
                  let flagChild = cus[key][k] + '';
                  flagChild = flagChild.split('.').join('');
                  cus[key][k] = parseInt(flagChild, 0);
                }
              }
            }
          }
        }
      }
      this.customerService.updateCustomer(cus)
        .then(() => {
          this.updateCustomerSuccessSwal.show().then(() => {
            this.disableForm();
            this.isUpdate = false;
          });
        })
        .catch(error => {
          this.updateCustomerErrorSwal.show();
        });
    } else {
      swal('Thông báo', 'Vui lòng kiểm tra các trường\nTên đơn vị\nĐV_Tel\nĐV_TableTel\nĐV_Email\nCác trường trên đều bắt buộc nhập và phải đúng định dạng'.replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>'), 'error');
      this.form.get('Name').markAsTouched();
      this.form.get('TableTel').markAsTouched();
      this.form.get('Tel').markAsTouched();
      this.form.get('Email').markAsTouched();
    }
    return false;
  }

  disableSubmitForm() {
    if (this.form.invalid) {
      swal('Thông báo', 'Vui lòng kiểm tra các trường\nTên đơn vị\nĐV_Tel\nĐV_TableTel\nĐV_Email\nCác trường trên đều bắt buộc nhập và phải đúng định dạng'.replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>').replace('\n', '<br>'), 'error');
      this.form.get('Name').markAsTouched();
      this.form.get('TableTel').markAsTouched();
      this.form.get('Tel').markAsTouched();
      this.form.get('Email').markAsTouched();
    } else {
      this.disableSubmit = true;
      this.updateCustomer();
    }
  }

  deleteCustomer() {
    this.customerService.removeCustomer(this.customer)
      .then(
        () => {
          this.deleteCustomerSuccessSwal.show().then(() => {
            this.router.navigate(['/customer']);
          });
        },
        () => {
          this.deleteCustomerFailSwal.show();
        }
      );
  }

  checkDuplicated(field: string, value: string) {
    let result = false;
    if (this.customerService.customerList) {
      const cus = this.customerService.customerList.find(
        e => e[field] && value && e[field].toLowerCase() === value.toLowerCase()
      );
      if (cus) {
        result = cus.Id !== this.customer.Id;
      }
    }
    this.duplicated[field] = result;
    return result;
  }

  formatCurrencyToNumber(object: any, field: string) {
    if (object && object[field] && typeof object[field] === 'string') {
      object[field] = +object[field].split('.').join('');
    }
  }

  getCustomerType() {
    this.customerService.getCustomerType()
      .then(
        (response: CustomerType[]) => {
          this.customerTypeList = response;
        },
        error => console.error(error)
      );
  }
  scroll(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


export class DuplicatedValidation {
  static isDuplicated(mainComponent: EditCustomerComponent, AC: AbstractControl) {
    ['Tel', 'Email', 'TaxCode', 'Name'].forEach((field) => {
      if (!AC.get(field).errors || (!AC.get(field).errors.pattern && !AC.get(field).errors.email)) {
        const control = AC.get(field).value;
        // const isDup =
        mainComponent.checkDuplicated(field, control);
        // if (isDup) {
        //     AC.get(field).setErrors({ Duplicated: true });
        // } else {
        //     AC.get(field).setErrors(null);
        // }
      }
    });
  }
}
