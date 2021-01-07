import { Component, OnInit, Output, EventEmitter, TemplateRef, Input, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerContactService } from 'src/app/customer/services/customer-contact.service';
import { CustomerContactCM, CUSTOMER_CONTACT_POSITIONS, CUSTOMER_CONTACT_FUNCTIONS } from 'src/app/customer/models/customer-contact';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-customer-contact',
  templateUrl: './create-customer-contact.component.html',
  styleUrls: ['./create-customer-contact.component.scss'],
})
export class CreateCustomerContactComponent implements OnInit {
  @ViewChild('createCustomerSuccessSwal') private createCustomerSuccessSwal: SwalComponent;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() customerId: string;
  modalRef: BsModalRef;
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
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private customerContactService: CustomerContactService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: new FormControl('', [Validators.required, Validators.pattern(/^[^0-9\$\^\#\@\!\&\*\~\`\[\]\{\}\\\|\/\>\<\.\,\?\'\"\;\:\+\-\=]*$/)]),
      Nation: new FormControl(''),
      Address: new FormControl(''),
      Phone: new FormControl('', [Validators.pattern(/^(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}$/)]),
      Email: new FormControl('', [Validators.email]),
      Gender: new FormControl(''),
      Position: new FormControl(''),
      BirthDate: new FormControl(''),
      Note: new FormControl(''),
      Functional: new FormControl(''),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.disableSubmit = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  createCustomerContact() {
    if (this.form.valid) {
      const phone = this.form.controls['Phone'].value;
      const email = this.form.controls['Email'].value;
      if (phone || email) {
        const customerContact: CustomerContactCM = this.form.value;
        this.customerContactService.createCustomerContactByCustomer(this.customerId, customerContact)
        .then(value => {
          this.modalService.hide(1);
          this.createCustomerSuccessSwal.show().then(() => {
            this.refresh.emit();
            this.form.reset();
          });
        })
        .catch(error => console.error(error));
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
    this.createCustomerContact();
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
