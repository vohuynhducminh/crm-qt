import { Component, OnInit, ViewChild, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerCareCM, CUSTOMER_CARE_TYPES } from 'src/app/customer/models/customer-care';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-customer-care',
  templateUrl: './create-customer-care.component.html',
  styleUrls: ['./create-customer-care.component.scss'],
})
export class CreateCustomerCareComponent implements OnInit {
  @ViewChild('createCustomerCareSuccessSwal') private createCustomerCareSuccessSwal: SwalComponent;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() customerId: string;
  modalRef: BsModalRef;
  form: FormGroup;
  customerCareTypeList = CUSTOMER_CARE_TYPES;

  disableSubmit = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Type: new FormControl('', [Validators.required]),
      Note: new FormControl('', [Validators.required]),
      Date: new FormControl('', [Validators.required]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.disableSubmit = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  createCustomerCare() {
    if (this.form.valid) {
      const customerCare: CustomerCareCM = this.form.value;
      this.customerService.createCustomerCareHistory(this.customerId, customerCare)
        .then(
          (response) => {
            this.modalService.hide(1);
            this.createCustomerCareSuccessSwal.show().then(() => {
              this.refresh.emit();
              this.form.reset();
            });
          },
          error => console.error(error)
        );
    } else {
      this.form.markAsTouched();
      this.disableSubmit = false;
    }
  }

  disableSubmitForm() {
    this.disableSubmit = true;
    this.createCustomerCare();
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
