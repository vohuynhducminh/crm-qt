import { Component, OnInit, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import swal from 'sweetalert2';
import { ContractVt, TelecomServiceModel, ContractVtAnnex } from 'src/app/contract-vt/models';
import { ContractVtAnnexService, TelecomService } from 'src/app/contract-vt/services';

@Component({
  selector: 'app-create-contract-vt-annex',
  templateUrl: './create-contract-vt-annex.component.html',
  styleUrls: ['./create-contract-vt-annex.component.scss'],
})
export class CreateContractVtAnnexComponent implements OnInit {

  @Output() refresh = new EventEmitter<string>();
  @Input() contract: ContractVt;
  @Input() services: TelecomServiceModel[] = [];
  type = 0;
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private modalService: BsModalService,
    private telecomService: TelecomService,
    private fb: FormBuilder,
    private contractVtAnnexService: ContractVtAnnexService
  ) { }
  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });
  ngOnInit() {
    this.form = this.fb.group({
      Note: [undefined],
      Code: [undefined, Validators.required],
      DateEnd: [null],
      DateAccept: [null],
      DateStart: [null, Validators.required],
    });
    this.form.addControl('Services', new FormArray([]));
  }
  async openModal(template: TemplateRef<any>) {
    this.form.get('Note').reset();
    this.form.get('Code').reset();
    this.form.get('DateEnd').reset();
    this.form.get('DateStart').reset();
    this.form.get('DateAccept').reset();
    const value = (this.form.get('Services') as FormArray).value;
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      await this.deleteService(this.form.get('Services') as FormArray, element['TelecomserviceId']);
    }
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-kd' });
  }

  clearArray(array: FormArray) {
    while (array.length !== 0) {
      array.removeAt(0);
    }
  }
  returnService(id: string): TelecomServiceModel {
    return this.services.find(service => service.Id === id);
  }
  addService(formArray: FormArray) {
    const group = this.fb.group({
      TelecomserviceId: ['', Validators.required],
      UnitAmount: [undefined, Validators.required],
      DateEnd: [null],
      Quantity: [undefined, Validators.required],
      Note: [undefined],
    });
    group.addControl('Data', new FormGroup({}));
    formArray.push(group);
  }

  deleteService(formArray: FormArray, id: string) {
    formArray.controls = formArray.controls.filter(group => group.get('TelecomserviceId').value !== id);
    formArray.setValue(formArray.value.filter(group => group.TelecomserviceId !== id));
  }
  async onSelectService(group: FormGroup) {
    await this.telecomService.getParameterById(group.get('TelecomserviceId').value)
      .then(res => {
        group.removeControl('Data');
        const data = new FormGroup({});
        res.forEach(param => {
          data.addControl(param, new FormControl(undefined));
        });
        group.addControl('Data', data);
      });

  }
  checkDisable(id: string): boolean {
    let check = false;
    (this.form.get('Services') as FormArray).controls.forEach(group => {
      if (group.get('TelecomserviceId').value === id) {
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
  submit() {
    const data: ContractVtAnnex = this.form.value;
    data.Type = this.type;
    data.ContractTelecomId = this.contract.Id;
    if (this.type === 0) {
      for (let i = 0; i < data.Services.length; i++) {
        const element = data.Services[i];
        let amount = element.UnitAmount + '';
        while (amount.includes('.')) {
          amount = amount.replace('.', '');
        }
        element.UnitAmount = parseInt(amount, 0);

        let quantity = element.Quantity + '';
        while (quantity.includes('.')) {
          quantity = quantity.replace('.', '');
        }
        element.Quantity = parseInt(quantity, 0);
      }
    } else {
      data.Services = undefined;
    }
    this.contractVtAnnexService.create(data)
      .then((res) => {
        this.refresh.emit('createLoad');
        swal('Thông báo', 'Khởi tạo phụ lục ' + data.Code + ' Thành công', 'success');
        this.modalRef.hide();
      })
      .catch((err) => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
