import { Component, OnInit, Output, EventEmitter, TemplateRef, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ContractCooperationSubService, TelecomService } from 'src/app/contract-cooperation/services';
import { ContractCooperation, Telecom, Customer, ContractCooperationSub, ContractCooperationService } from 'src/app/contract-cooperation/models';
import swal from 'sweetalert2';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-create-contract-cooperation-sub',
  templateUrl: './create-contract-cooperation-sub.component.html',
  styleUrls: ['./create-contract-cooperation-sub.component.scss'],
})
export class CreateContractCooperationSubComponent implements OnInit {

  @Output() refresh: EventEmitter<string> = new EventEmitter<string>();
  modalRef: BsModalRef;
  form: FormGroup;
  @Input() contractCooperation: ContractCooperation = new ContractCooperation();
  @Input() customers: Customer[] = [];
  @Input() services: { CoContractService: ContractCooperationService, Service: Telecom }[] = [];
  listStatus = [{ label: 'Chưa kích hoạt', value: 0 }, { label: 'Đang kích hoạt', value: 1 }, { label: 'Đã hủy', value: 2 }];
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private contractCooperationSubService: ContractCooperationSubService
  ) { }

  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });

  async ngOnInit() {
    this.form = this.fb.group({
      CooperationContractId: [this.contractCooperation.Id],
      Code: ['', Validators.required],
      Note: [''],
      CustomerId: [undefined, Validators.required],
      DateStart: [new Date(), Validators.required],
      DateEnd: [null],
      Status: [0],
      Type: [0],
      Total: [0],
    });
    this.form.addControl('Services', new FormArray([]));
  }
  async openModal(template: TemplateRef<any>) {
    if (this.services.length > 0) {
      this.form.get('CooperationContractId').setValue(this.contractCooperation.Id);
      this.form.get('Code').setValue('');
      this.form.get('Code').reset();
      this.form.get('Note').setValue('');
      this.form.get('CustomerId').setValue(undefined);
      this.form.get('CustomerId').reset();
      this.form.get('DateStart').setValue(new Date());
      this.form.get('DateStart').reset();
      this.form.get('DateEnd').setValue(null);
      this.form.get('Status').setValue(0);
      this.form.get('Type').setValue(0);
      const value = (this.form.get('Services') as FormArray).value;
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        await this.deleteService(this.form.get('Services') as FormArray, element['CoContractTelServiceId']);
      }
      this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
    } else {
      swal('Thông báo', 'Không thể tạo vì hợp đồng khung không còn dịch vụ nào được cung cấp', 'warning');
    }
  }
  returnCustomer(id: string): Customer {
    return this.customers.find(customer => customer.Id === id);
  }
  returnService(id: string): { CoContractService: ContractCooperationService, Service: Telecom } {
    return this.services.find(co => co.CoContractService.Id === id);
  }
  submit() {
    const data: ContractCooperationSub = this.form.value;
    for (let i = 0; i < data.Services.length; i++) {
      const element = data.Services[i];
      let amount = element.Amount + '';
      while (amount.includes('.')) {
        amount = amount.replace('.', '');
      }
      element.Amount = parseInt(amount, 0);
    }
    this.contractCooperationSubService.create(data)
      .then((res) => {
        this.refresh.emit('createLoad');
        swal('Thông báo', 'Khởi tạo hợp đồng con ' + data.Code + ' Thành công', 'success');
        this.modalRef.hide();
      })
      .catch((err) => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }

  addService(formArray: FormArray) {
    const group = this.fb.group({
      CoContractTelServiceId: ['', Validators.required],
      Amount: [undefined, Validators.required],
    });
    // group.addControl('ObjData', new FormGroup({}));
    formArray.push(group);
  }

  deleteService(formArray: FormArray, id: string) {
    formArray.controls = formArray.controls.filter(group => group.get('CoContractTelServiceId').value !== id);
    formArray.setValue(formArray.value.filter(group => group.CoContractTelServiceId !== id));
  }
  async onSelectService(group: FormGroup) {
    // await this.telecomService.getParameterById(group.get('CoContractTelServiceId').value)
    //   .then(res => {
    //     group.removeControl('ObjData');
    //     const data = new FormGroup({});
    //     res.forEach(param => {
    //       data.addControl(param, new FormControl(undefined));
    //     });
    //     group.addControl('ObjData', data);
    //   });

  }
  checkDisable(id: string): boolean {
    let check = false;
    (this.form.get('Services') as FormArray).controls.forEach(group => {
      if (group.get('CoContractTelServiceId').value === id) {
        check = true;
      }
    });
    return check;
  }
  returnKeys(data: Object): string[] {
    return Object.keys(data);
  }
  returnDataControlValid(control: FormControl) {
    if (control) {
      return (control.dirty || control.touched) && control.invalid;
    }
    return false;
  }
}
