import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerCareUM, CUSTOMER_CARE_TYPES } from 'src/app/customer/models/customer-care';

@Component({
  selector: 'app-edit-customer-care',
  templateUrl: './edit-customer-care.component.html',
  styleUrls: ['./edit-customer-care.component.scss'],
})
export class EditCustomerCareComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  customerId: string;
  form: FormGroup;
  customerCareTypeList = CUSTOMER_CARE_TYPES;

  disableSubmit = false;
  _customerCare: CustomerCareUM;

  constructor(
    public modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Id: new FormControl('', [Validators.required]),
      Type: new FormControl('', [Validators.required]),
      Note: new FormControl('', [Validators.required]),
      Date: new FormControl('', [Validators.required]),
    });
    this.form.patchValue(this._customerCare);
  }

  updateCustomerCare() {
    if (this.form.valid) {
      const customerCare: CustomerCareUM = this.form.value;
      this.customerService.updateCustomerCareHistory(this.customerId, customerCare)
      .then(
        (response) => {
          console.log(response);
          this.modalRef.hide();
          this.refresh.emit();
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
    this.updateCustomerCare();
  }

}
