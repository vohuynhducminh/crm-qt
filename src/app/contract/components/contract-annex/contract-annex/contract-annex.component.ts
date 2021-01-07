import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AnnexService } from '../../../services/annex.service';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-annex',
  templateUrl: './contract-annex.component.html',
  styleUrls: ['./contract-annex.component.scss'],
  providers: [DatePipe],
})
export class ContractAnnexComponent implements OnInit {
  canActive = {
    create: false,
  };
  constructor(
    private modalService: BsModalService,
    private annexService: AnnexService,
    private contractService: ContractService,
    private router: ActivatedRoute,
    private datepipe: DatePipe,
    private fb: FormBuilder,
    public authService: AuthGuardService
  ) {
    this.canActive.create = authService.checkAccess(['business', 'contract', 'create']);
  }
  selectedContract: any;
  modalRef: BsModalRef;
  objectTable: { No: string, annex: [] } = { No: '', annex: [] };
  dataTable = [];
  objSelected: any;
  selection = [];
  selectionFather = [];
  contractId: string;
  formCreate: FormGroup;
  formUpdate: FormGroup;
  @ViewChild('success') private successSwal: SwalComponent;
  @ViewChild('successForm') private successFormSwal: SwalComponent;
  @ViewChild('error') private errorSwal: SwalComponent;
  listTypes = [{ type: 0, label: 'Giá thuê' }, { type: 1, label: 'Giá dịch vụ' }, { type: 2, label: 'Diện tích thuê' }, { type: 3, label: 'Diện tích dịch vụ' }];
  listGround = [{ key: 0, label_ground: '1' }, { key: 1, label_ground: '2' }, { key: 2, label_ground: '3' }, { key: 3, label_ground: '4' }];  
  key = 0;
  type = 0;
  currencyMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  });
  min: Date = null;
  currencyNoDecMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
  });
  async ngOnInit() {
    await this.init();
    this.buildForm();
    this.buildFormUpdate();
  }
  async init() {
    await this.router.params.subscribe(async params => {
      this.contractId = params['id'];
      if (!this.selectedContract) {
        await this.contractService.getContractById(this.contractId)
          .then(res => {
            this.selectedContract = res;
            this.selectedContract.Square = this.toSeparate(this.selectedContract.Square);
            this.selectedContract.UnitPrice = this.toSeparate(this.selectedContract.UnitPrice);
            this.selectedContract.UnitServicePrice = this.toSeparate(this.selectedContract.UnitServicePrice);
            console.log(res.UnitServicePrice);
            if (res.UnitServicePrice === 0) {
              this.listTypes = [{ type: 0, label: 'Giá thuê' }, { type: 2, label: 'Diện tích thuê' }];
            }             
          });
      }
    });
    await this.contractService.getAppendixByContractId(this.contractId)
      .then(
        (res) => {
          // res.forEach(appenDix => {
          //   appenDix.DateStart = this.datepipe.transform(appenDix.DateStart, 'dd/MM/yyyy');
          //   appenDix.DateEnd = appenDix.DateEnd ? this.datepipe.transform(appenDix.DateEnd, 'dd/MM/yyyy') : null;
          //   appenDix.DateSign = this.datepipe.transform(appenDix.DateSign, 'dd/MM/yyyy');
          // });
          (res as any[]).sort((a, b) => {
            return new Date(this.datepipe.transform(new Date(a.DateStart), 'yyyy-MM-dd') + 'T00:00:00').getTime() - new Date(this.datepipe.transform(new Date(b.DateStart), 'yyyy-MM-dd') + 'T00:00:00').getTime();
          });
          const arr = [];
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            element.Square = this.toSeparate(element.Square);
            element.UnitPrice = this.toSeparate(element.UnitPrice);
            element.UnitServicePrice = this.toSeparate(element.UnitServicePrice);
            const index = arr.findIndex(e => e.No === element.No);
            if (index === -1) {
              const model = { No: element.No, annex: [] };
              model.annex.push(element);
              arr.push(model);
            } else {
              arr[index].annex.push(element);
            }
          }
          this.dataTable = arr;
          if (this.objectTable) {
            const newModel = arr.find(e => e.No === this.objectTable.No);
            if (newModel) {
              this.selectionFather = [newModel];
              if (this.objSelected) {
                this.selection = [newModel.annex.find(e => e.Id === this.objSelected.Id)];
              }
            }
            this.onSelectTable({ selected: [newModel ? newModel : { No: '', annex: [] }] });
          }
        }
      );
  }

  buildForm() {
    if (this.formCreate) {
      console.log(this.objSelected);
      this.type = this.objSelected ? this.objSelected.Type : 0;
      this.formCreate.get('No').setValue(this.objSelected ? this.objSelected.No : undefined);
      this.formCreate.get('No').setErrors(null);
      this.formCreate.get('DateStart').setValue(this.objSelected ? this.objSelected.DateStart : null);
      this.formCreate.get('DateStart').setErrors(null);
      this.formCreate.get('DateEnd').setValue(this.objSelected ? this.objSelected.DateEnd : null);
      this.formCreate.get('DateEnd').setErrors(null);
      this.formCreate.get('DateSign').setValue(this.objSelected ? this.objSelected.DateSign : null);
      this.formCreate.get('DateSign').setErrors(null);
      this.formCreate.get('Building').setValue(this.objSelected ? this.objSelected.Building : undefined);
      this.formCreate.get('Building').setErrors(null);
      this.formCreate.get('Floor').setValue(this.objSelected ? this.objSelected.Floor : undefined);
      this.formCreate.get('Floor').setErrors(null);
      this.formCreate.get('Room').setValue(this.objSelected ? this.objSelected.Room : undefined);
      this.formCreate.get('Room').setErrors(null);
      this.formCreate.get('Square').setValue(this.objSelected ? this.objSelected.Square ? this.objSelected.Square : this.selectedContract.Square : this.selectedContract ? this.selectedContract.Square : undefined);
      this.formCreate.get('Square').setErrors(null);
      this.formCreate.get('UnitPrice').setValue(this.objSelected ? this.objSelected.UnitPrice ? this.objSelected.UnitPrice : this.selectedContract.UnitPrice : this.selectedContract ? this.selectedContract.UnitPrice : undefined);
      this.formCreate.get('UnitPrice').setErrors(null);
      this.formCreate.get('UnitServicePrice').setValue(this.objSelected ? this.objSelected.UnitServicePrice ? this.objSelected.UnitServicePrice : this.selectedContract.UnitServicePrice : this.selectedContract ? this.selectedContract.UnitServicePrice : undefined);
      this.formCreate.get('UnitServicePrice').setErrors(null);
      this.formCreate.get('Key').setValue(this.objSelected ? this.objSelected.Key : null);
      this.formCreate.get('Key').setErrors(null);
      this.formCreate.get('Note').setValue(this.objSelected ? this.objSelected.Note : undefined);
      this.formCreate.get('Note').setErrors(null);
      console.log(this.formCreate);
    } else {
      this.formCreate = this.fb.group({
        No: ['', [Validators.required]],
        DateStart: [null, [Validators.required]],
        DateEnd: [null],
        DateSign: [null, [Validators.required]],
        Square: [this.selectedContract ? this.selectedContract.Square : undefined, [Validators.required]],
        Building: [undefined, [Validators.required]],
        Note: [undefined],
        Floor: [undefined],
        Room: [undefined],
        UnitPrice: [this.selectedContract ? this.selectedContract.UnitPrice : undefined, [Validators.required]],
        UnitServicePrice: [this.selectedContract ? this.selectedContract.UnitServicePrice : undefined, this.selectedContract && this.selectedContract.UnitServicePrice ? [Validators.required] : []],
        Key: [undefined, [Validators.required]],
      });
    }
  }

  buildFormUpdate() {
    if (this.formUpdate) {
      this.type = this.objSelected ? this.objSelected.Type : 0;
      this.formUpdate.get('DateStart').setValue(this.objSelected.DateStart);
      this.formUpdate.get('DateStart').setErrors(null);
      this.formUpdate.get('DateEnd').setValue(this.objSelected.DateEnd);
      this.formUpdate.get('DateEnd').setErrors(null);
      this.formUpdate.get('DateSign').setValue(this.objSelected.DateSign);
      this.formUpdate.get('DateSign').setErrors(null);
      this.formUpdate.get('Building').setValue(this.objSelected ? this.objSelected.Building : undefined);
      this.formUpdate.get('Building').setErrors(null);
      this.formUpdate.get('Floor').setValue(this.objSelected ? this.objSelected.Floor : undefined);
      this.formUpdate.get('Floor').setErrors(null);
      this.formUpdate.get('Room').setValue(this.objSelected ? this.objSelected.Room : undefined);
      this.formUpdate.get('Room').setErrors(null);
      this.formUpdate.get('Square').setValue(this.objSelected ? this.objSelected.Square ? this.objSelected.Square : this.selectedContract.Square : this.selectedContract ? this.selectedContract.Square : undefined);
      this.formUpdate.get('Square').setErrors(null);
      this.formUpdate.get('UnitPrice').setValue(this.objSelected ? (this.objSelected.UnitPrice ? this.objSelected.UnitPrice : this.selectedContract.UnitPrice) : undefined);
      this.formUpdate.get('UnitPrice').setErrors(null);
      this.formUpdate.get('UnitServicePrice').setValue(this.objSelected ? (this.objSelected.UnitServicePrice ? this.objSelected.UnitServicePrice : this.selectedContract.UnitServicePrice) : undefined);
      this.formUpdate.get('UnitServicePrice').setErrors(null);
      this.formUpdate.get('Note').setValue(this.objSelected ? this.objSelected.Note : undefined);
      this.formUpdate.get('Note').setErrors(null);
    } else {
      this.formUpdate = this.fb.group({
        DateStart: [null, [Validators.required]],
        DateEnd: [null],
        DateSign: [null, [Validators.required]],
        Square: [this.selectedContract ? this.selectedContract.Square : undefined, [Validators.required]],
        Building: [undefined, [Validators.required]],
        Note: [undefined],
        Floor: [undefined],
        Room: [undefined],
        UnitPrice: [this.selectedContract ? this.selectedContract.UnitPrice : undefined, [Validators.required]],
        UnitServicePrice: [this.selectedContract ? this.selectedContract.UnitServicePrice : undefined, this.selectedContract && this.selectedContract.UnitServicePrice ? [Validators.required] : []],
      });
    }
  }
  openModal(template: TemplateRef<any>, type: 'update' | 'create') {
    if (type === 'update') {
      this.buildFormUpdate();
    } else {
      this.buildForm();
    }
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-lg' });
  }
  submit() {
    if (this.formCreate.valid) {
      const data = this.formCreate.value;
      if (this.type === 0) {
        data.UnitServicePrice = undefined;
        data.Square = undefined;
        data.UnitPrice = data.UnitPrice + '';
        while (data.UnitPrice.includes('.')) {
          data.UnitPrice = data.UnitPrice.replace('.', '');
        }
        data.UnitPrice = parseInt(data.UnitPrice, 0);
      } else if (this.type === 1) {
        data.UnitServicePrice = data.UnitServicePrice + '';
        while (data.UnitServicePrice.includes('.')) {
          data.UnitServicePrice = data.UnitServicePrice.replace('.', '');
        }
        data.UnitServicePrice = parseInt(data.UnitServicePrice, 0);
        data.UnitPrice = undefined;
        data.Square = undefined;
      } else {
        data.Square = data.Square + '';
        while (data.Square.includes('.')) {
          data.Square = data.Square.replace('.', '');
        }
        while (data.Square.includes(',')) {
          data.Square = data.Square.replace(',', '.');
        }
        data.Square = parseFloat(data.Square);
        data.UnitPrice = undefined;
        data.UnitServicePrice = undefined;
      }

      data.Type = this.type;
      data.ContractId = this.contractId;
      this.annexService.createAnnex(data)
        .then(
          (res) => {
            this.init();
            this.modalRef.hide();
            swal('Tạo phụ lục thành công', '', 'success');
          }
        ).catch(
          err => swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error')
        );
    } else {
      swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
    }
  }
  update() {
    if (this.formUpdate.valid) {
      const data = this.formUpdate.value;
      if (this.type === 0) {
        data.UnitServicePrice = undefined;
        data.Square = undefined;
        data.UnitPrice = data.UnitPrice + '';
        while (data.UnitPrice.includes('.')) {
          data.UnitPrice = data.UnitPrice.replace('.', '');
        }
        data.UnitPrice = parseInt(data.UnitPrice, 0);
      } else if (this.type === 1) {
        data.UnitServicePrice = data.UnitServicePrice + '';
        while (data.UnitServicePrice.includes('.')) {
          data.UnitServicePrice = data.UnitServicePrice.replace('.', '');
        }
        data.UnitServicePrice = parseInt(data.UnitServicePrice, 0);
        data.UnitPrice = undefined;
        data.Square = undefined;
      } else {
        data.Square = data.Square + '';
        while (data.Square.includes('.')) {
          data.Square = data.Square.replace('.', '');
        }
        while (data.Square.includes(',')) {
          data.Square = data.Square.replace(',', '.');
        }
        data.Square = parseFloat(data.Square);
        data.UnitPrice = undefined;
        data.UnitServicePrice = undefined;
      }

      data.Id = this.objSelected.Id;
      data.No = this.objSelected.No;
      data.Type = this.type;
      data.ContractId = this.contractId;
      this.annexService.updateAnnex(data)
        .then(
          (res) => {
            this.init();
            this.objSelected = data;
            this.objSelected.Square = this.toSeparate(this.objSelected.Square);
            this.objSelected.UnitPrice = this.toSeparate(this.objSelected.UnitPrice);
            this.objSelected.UnitServicePrice = this.toSeparate(this.objSelected.UnitServicePrice);
            this.modalRef.hide();
            swal('Cập nhật phụ lục thành công', '', 'success');
          }
        ).catch(
          err => {
            swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
          }
        );
    } else {
      swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
    }
  }
  delete() {
    swal({
      title: 'Quyết định xóa?',
      text: 'Sau khi xóa sẽ mất hoàn toàn!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.annexService.deleteAnnex(this.objSelected.Id)
          .then(
            (res) => {
              this.init();
              this.objSelected = undefined;
              swal('Xóa phụ lục thành công', '', 'success');
            }
          ).catch(
            err => {
              swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            }
          );
      }
    });
  }
  onSelectTable(event: any) {
    if (this.objectTable && this.objectTable.No !== event.selected[0].No) {
      this.objSelected = undefined;
      this.selection = [];
    }
    this.objectTable = event.selected[0];
    this.dataTable = [...this.dataTable];
  }
  onSelect(event: any) {
    this.objSelected = event.selected[0];
  }
  toSeparate(value: number) {
    if (!value) {
      return '';
    } else {
      let flag = value + '';
      if (flag.includes('.')) {
        const tag = (flag + '').split('.');
        tag[0] = tag[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        flag = tag[0] + ',' + tag[1];
      } else {
        flag = flag.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      }
      return flag;
    }
  }
  payOff() {
    this.annexService.payOff(this.objSelected.Id)
      .then(
        () => {
          this.objSelected.Status = -1;
          this.successSwal.show();
          this.init();
        }
      )
      .catch((err) => console.error(err));
  }

  // checkDate(data: Date): boolean {
  //   if (data) {
  //     const time = new Date(this.datepipe.transform(new Date(), 'yyyy-MM-dd') + 'T00:00:00').getTime();
  //     const real = new Date(this.datepipe.transform(new Date(data), 'yyyy-MM-dd') + 'T00:00:00').getTime();
  //     if (real < time) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  returnLabel(type: number) {
    return this.listTypes.find(e => e.type === type).label;
  }

  returnContent(row: any) {           
    // console.log(this.listTypes.find(e => e.type === row.Type) + ': ' + (row.Type === 0 ? (row.UnitPrice + ' vnđ/m2') : (row.Type === 1 ? (row.UnitServicePrice + ' vnđ/m2') : (row.Square + ' m2')));        
    return this.listTypes.find(e => e.type === row.Type).label + ': ' + (row.Type === 0 ? (row.UnitPrice + ' vnđ/m2') : (row.Type === 1 ? (row.UnitServicePrice === "" ? "0" + ' vnđ/m2' : row.UnitServicePrice + ' vnđ/m2') : (row.Square + ' m2')));
  }

  onChangeType(forWhat: 'update' | 'create') {
    if (forWhat === 'update') {
      this.formUpdate.get('Square').setValue(this.objSelected ? this.objSelected.Square ? this.objSelected.Square : this.selectedContract.Square : this.selectedContract ? this.selectedContract.Square : undefined);
      this.formUpdate.get('UnitServicePrice').setValue(this.objSelected ? this.objSelected.UnitServicePrice ? this.objSelected.UnitServicePrice : this.selectedContract.UnitServicePrice : this.selectedContract ? this.selectedContract.UnitServicePrice : undefined);
      this.formUpdate.get('UnitPrice').setValue(this.objSelected ? this.objSelected.UnitPrice ? this.objSelected.UnitPrice : this.selectedContract.UnitPrice : this.selectedContract ? this.selectedContract.UnitPrice : undefined);
    } else {
      this.formCreate.get('Square').setValue(this.objSelected ? this.objSelected.Square ? this.objSelected.Square : this.selectedContract.Square : this.selectedContract ? this.selectedContract.Square : undefined);
      this.formCreate.get('UnitServicePrice').setValue(this.objSelected ? this.objSelected.UnitServicePrice ? this.objSelected.UnitServicePrice : this.selectedContract.UnitServicePrice : this.selectedContract ? this.selectedContract.UnitServicePrice : undefined);
      this.formCreate.get('UnitPrice').setValue(this.objSelected ? this.objSelected.UnitPrice ? this.objSelected.UnitPrice : this.selectedContract.UnitPrice : this.selectedContract ? this.selectedContract.UnitPrice : undefined);
    }
  }
}
