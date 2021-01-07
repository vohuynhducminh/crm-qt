import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerCM, Customer } from 'src/app/customer/models/customer';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  @ViewChild('createCustomerSuccessSwal')
  private createCustomerSuccessSwal: SwalComponent;
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

  @Input() BtnClass: string;
  @Input() BtnText: string;
  @Input() CustomerInitName: string;

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() AfterCreateSuccess: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() CustomerInitNameChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  modalRef: BsModalRef;
  form: FormGroup;
  disableSubmit = false;
  duplicated: any = {};

  constructor(
    private modalService: BsModalService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        Name: new FormControl(''),
        Address: new FormControl(''),
        Country: new FormControl(''),
        Tel: new FormControl(''),
        Fax: new FormControl(''),
        Email: new FormControl(''),
        OwnerUM: new FormGroup({
          Name: new FormControl(''),
          Position: new FormControl(''),
        }),
        TaxCode: new FormControl(''),
        NumberOfBusinessLicense: new FormControl(''),
      },
      {
        // tslint:disable-next-line: no-use-before-declare
        validator: DuplicatedValidation.isDuplicated.bind(this, this),
      }
    );
  }

  onCustomerInitNameInput() {
    this.CustomerInitNameChange.emit(this.form.controls['Name'].value);
  }

  openModal(template: TemplateRef<any>) {
    this.disableSubmit = false;
    if (this.form) {
      this.form.controls['Name'].setValue(
        this.CustomerInitName ? this.CustomerInitName : ''
      );
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-kd',
      ignoreBackdropClick: true,
    });
  }

  hideModal() {
    this.modalRef.hide();
    this.form.reset();
  }

  createCustomer() {
    const name = this.form.controls['Name'].value;
    const tel = this.form.controls['Tel'].value;
    const email = this.form.controls['Email'].value;
    if (name && (tel || email) && !this.duplicated['Name']) {
      //  && !this.duplicated['TaxCode']
      const cusCM: CustomerCM = { ...this.form.value };
      console.log(cusCM);
      console.log(this.form.value);
      this.customerService
        .createCustomer(cusCM)
        .then((response) => {
          this.modalRef.hide();
          this.createCustomerSuccessSwal.show().then(() => {
            this.refresh.emit();
            this.AfterCreateSuccess.emit(response.Id);
            this.form.reset();
          });
        })
        .catch((error) => console.error(error));
    } else {
      this.form.get('Name').markAsTouched();
      this.form.get('Tel').markAsTouched();
      this.form.get('Email').markAsTouched();
      this.disableSubmit = false;
    }
  }

  disableSubmitForm() {
    this.disableSubmit = true;
    this.createCustomer();
  }

  checkDuplicated(field: string, value: string) {
    let result = false;
    if (this.customerService.customerList) {
      result =
        this.customerService.customerList.findIndex(
          (e) =>
            e[field] && value && (e[field] as string).toLowerCase().trim() === value.toLowerCase().trim()
        ) >= 0;
    }
    this.duplicated[field] = result;
    return result;
  }

  checkAccess = (group: string, attribute: string): boolean => {
    const access_roles = environment.access_roles; // Bên environtment
    const { roles } = JSON.parse(localStorage.getItem('CRM_TOKEN')); // token
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
  }
}

export class DuplicatedValidation {
  static isDuplicated(
    mainComponent: CreateCustomerComponent,
    AC: AbstractControl
  ) {
    ['Tel', 'Email', 'TaxCode', 'Name'].forEach((field) => {
      if (
        !AC.get(field).errors ||
        (!AC.get(field).errors.pattern && !AC.get(field).errors.email)
      ) {
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
