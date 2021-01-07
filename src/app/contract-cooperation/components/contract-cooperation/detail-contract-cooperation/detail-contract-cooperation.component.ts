import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ContractCooperationService, ContractCooperationCustomerService, TelecomService } from 'src/app/contract-cooperation/services';
import { ContractCooperation, Telecom, Customer } from 'src/app/contract-cooperation/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail-contract-cooperation',
  templateUrl: './detail-contract-cooperation.component.html',
  styleUrls: ['./detail-contract-cooperation.component.scss'],
})
export class DetailContractCooperationComponent implements OnInit {
  @Input() contractCooperation: ContractCooperation;
  @Output() refresh: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;
  customers: Customer[] = [];
  services: Telecom[] = [];
  availableServices: { CoContractService: ContractCooperationService, Service: Telecom }[][] = [];
  listStatus = [{ label: 'Chưa kích hoạt', value: 0 }, { label: 'Đang kích hoạt', value: 1 }, { label: 'Đã hủy', value: 2 }];
  constructor(
    private fb: FormBuilder,
    private contractCooperationService: ContractCooperationService,
    private contractCooperationCustomerService: ContractCooperationCustomerService,
    private telecomService: TelecomService
  ) { }

  async ngOnInit() {
    await this.initForm();
    await this.loadService();
    await this.loadCustomer();
  }
  async loadCustomer() {
    await this.contractCooperationCustomerService.getAll()
      .then((res) => this.customers = res.map(e => e));
  }
  async loadService() {
    await this.telecomService.getAll()
      .then((res) => this.services = res.map(e => e));
  }
  async initForm() {
    const initForm = {};
    initForm['Id'] = new FormControl(this.contractCooperation.Id, Validators.required);
    initForm['Code'] = new FormControl(this.contractCooperation.Code, Validators.required);
    initForm['Note'] = new FormControl(this.contractCooperation.Note, Validators.required);
    initForm['ParnerId'] = new FormControl(this.contractCooperation.ParnerId, Validators.required);
    initForm['DateSinged'] = new FormControl(this.contractCooperation.DateSinged);
    initForm['DateStart'] = new FormControl(this.contractCooperation.DateStart, Validators.required);
    initForm['DateEnd'] = new FormControl(this.contractCooperation.DateEnd);
    initForm['Status'] = new FormControl(this.contractCooperation.Status);
    this.form = new FormGroup(initForm);
  }
  returnCustomer(id: string): Customer {
    return this.customers.find(customer => customer.Id === id);
  }

  submit() {
    const data: ContractCooperation = this.form.value;
    this.contractCooperationService.update(data)
      .then((res) => {
        swal('Thông báo', 'Cập nhật hợp đồng khung ' + data.Code + ' Thành công', 'success');
      })
      .catch((err) => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
