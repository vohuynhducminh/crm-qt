import { Component, OnInit, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import swal from 'sweetalert2';
import { ContractVt, TelecomServiceModel, ContractVtAnnex } from 'src/app/contract-vt/models';
import { ContractVtAnnexService, TelecomService } from 'src/app/contract-vt/services';

@Component({
  selector: 'app-detail-contract-vt-annex',
  templateUrl: './detail-contract-vt-annex.component.html',
  styleUrls: ['./detail-contract-vt-annex.component.scss'],
})
export class DetailContractVtAnnexComponent implements OnInit {
  @Output() refresh = new EventEmitter<string>();
  @Input() contract: ContractVt;
  @Input() objSelected: ContractVtAnnex;
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
      DateEnd: [null],
      DateAccept: [null],
      DateStart: [null, Validators.required],
    });
    this.form.addControl('Services', new FormArray([]));
  }
  async openModal(template: TemplateRef<any>) {
    this.contractVtAnnexService.getById(this.objSelected.Id)
      .then(async (res) => {
        res.Services = res.Services ? res.Services : [];
        this.type = this.objSelected.Type;
        this.form.get('Note').setValue(this.objSelected.Note);
        this.form.get('DateEnd').setValue(this.objSelected.DateEnd);
        this.form.get('DateStart').setValue(this.objSelected.DateStart);
        this.form.get('DateAccept').setValue(this.objSelected.DateAccept);
        const value = (this.form.get('Services') as FormArray).value;
        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          await this.deleteService(this.form.get('Services') as FormArray, element['TelecomserviceId']);
        }
        if (res.Type === 0) {
          for (let index = 0; index < res.Services.length; index++) {
            const element = res.Services[index];
            const group = this.fb.group({
              TelecomserviceId: [element.TelecomserviceId, Validators.required],
              DateEnd: [element.DateEnd],
              UnitAmount: [element.UnitAmount, Validators.required],
              Quantity: [element.Quantity, Validators.required],
              Note: [element.Note],
            });
            const data = new FormGroup({});
            for (const key in element.Data) {
              if (element.Data.hasOwnProperty(key)) {
                const child = element.Data[key];
                data.addControl(key, new FormControl(child));
              }
            }
            group.addControl('Data', data);
            (this.form.get('Services') as FormArray).push(group);
          }
        }
        this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-kd' });
      }).catch((err) => {
        console.log(err);
        swal('Thông báo', 'Không tìm thấy phụ lục ' + this.objSelected.Code, 'error');
      });
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
    data.Code = this.objSelected.Code;
    data.ContractTelecomId = this.contract.Id;
    data.Id = this.objSelected.Id;
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
    this.contractVtAnnexService.update(data)
      .then((res) => {
        this.refresh.emit('createLoad');
        swal('Thông báo', 'Cập nhật phụ lục ' + data.Code + ' Thành công', 'success');
        this.modalRef.hide();
      })
      .catch((err) => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
