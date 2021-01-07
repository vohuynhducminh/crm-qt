import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerContactVM, CustomerContactUM, CUSTOMER_CONTACT_POSITIONS, CUSTOMER_CONTACT_FUNCTIONS } from 'src/app/customer/models/customer-contact';
import { CustomerContactService } from 'src/app/customer/services/customer-contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-customer-contact',
  templateUrl: './edit-customer-contact.component.html',
  styleUrls: ['./edit-customer-contact.component.scss'],
})
export class EditCustomerContactComponent implements OnInit {
  @ViewChild('updateCustomerContactSuccessSwal') private updateCustomerContactSuccessSwal: SwalComponent;
  @ViewChild('deleteCustomerContactSuccessSwal') private deleteCustomerContactSuccessSwal: SwalComponent;
  @ViewChild('deleteCustomerContactFailSwal') private deleteCustomerContactFailSwal: SwalComponent;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() customerId: string;
  @Input()
  set getCustomerContactVM(customerContactVM: CustomerContactVM) {
    if (customerContactVM) {
      this.isUpdate = false;
      this.registerForm();
      this.form.patchValue(customerContactVM);
    }
  }
  customerContactVM: CustomerContactVM;
  isUpdate = false;
  form: FormGroup;
  customerContactPositionList = CUSTOMER_CONTACT_POSITIONS;
  customerContactFunctionList = CUSTOMER_CONTACT_FUNCTIONS;

  disableSubmit = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private customerContactService: CustomerContactService
  ) { }

  ngOnInit() {
  }

  registerForm() {
    this.form = this.formBuilder.group({
      Id: new FormControl(''),
      Name: new FormControl('', [Validators.required, Validators.pattern(/^[^0-9\$\^\#\@\!\&\*\~\`\[\]\{\}\\\|\/\>\<\.\,\?\'\"\;\:\+\-\=]*$/)]),
      Nation: new FormControl(''),
      Address: new FormControl(''),
      Phone: new FormControl('', [Validators.pattern(/^(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}$/)]),
      Email: new FormControl('', [Validators.email]),
      Gender: new FormControl(null),
      Position: new FormControl(''),
      BirthDate: new FormControl(''),
      Note: new FormControl(''),
      Functional: new FormControl(''),
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

  updateCustomerContact() {
    if (this.form.valid) {
      const phone = this.form.controls['Phone'].value;
      const email = this.form.controls['Email'].value;
      if (phone || email) {
        const customerContact: CustomerContactUM = this.form.value;
        this.customerContactService.updateCustomerContactByCustomer(this.customerId, customerContact)
        .then(
          () => {
            this.updateCustomerContactSuccessSwal.show().then(
              () => {
                this.refresh.emit();
                this.isUpdate = false;
                this.disableForm();
              }
            );
          },
          error => console.error(error)
        );
      } else {
        this.form.get('Name').markAsTouched();
        this.form.get('Phone').markAsTouched();
        this.form.get('Email').markAsTouched();
        this.disableSubmit = false;
      }
    } else {
      this.form.get('Name').markAsTouched();
      this.form.get('Phone').markAsTouched();
      this.form.get('Email').markAsTouched();
      this.disableSubmit = false;
    }
  }

  disableSubmitForm() {
    this.disableSubmit = true;
    this.updateCustomerContact();
  }

  deleteCustomerContact(id: string) {
    this.customerContactService.deleteCustomerContactByCustomer(this.customerId, id)
    .then(
      () => {
        this.deleteCustomerContactSuccessSwal.show()
          .then(
            () => {
              this.form = null;
              this.refresh.emit();
            }
          );
      },
      error => {
        this.deleteCustomerContactFailSwal.show();
        console.error(error);
      }
    );
  }
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

}
