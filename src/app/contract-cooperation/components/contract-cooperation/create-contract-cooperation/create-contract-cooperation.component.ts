import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContractCooperationService } from 'src/app/contract-cooperation/services';
import { ContractCooperation, Customer } from 'src/app/contract-cooperation/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-contract-cooperation',
  templateUrl: './create-contract-cooperation.component.html',
  styleUrls: ['./create-contract-cooperation.component.scss'],
})
export class CreateContractCooperationComponent implements OnInit {
  @Output() refresh: EventEmitter<string> = new EventEmitter<string>();
  modalRef: BsModalRef;
  form: FormGroup;
  @Input() customers: Customer[] = [];
  listStatus = [{ label: 'Chưa kích hoạt', value: 0 }, { label: 'Đang kích hoạt', value: 1 }, { label: 'Đã hủy', value: 2 }];
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private contractCooperationService: ContractCooperationService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Code: ['', Validators.required],
      Note: [''],
      ParnerId: [undefined, Validators.required],
      DateSinged: [null],
      Percentage: [0, Validators.required],
      DateStart: [new Date(), Validators.required],
      DateEnd: [null],
      Status: [0],
    });
    this.form.addControl('Services', new FormArray([]));
  }

  async openModal(template: TemplateRef<any>) {
    this.form.get('Code').setValue('');
    this.form.get('Code').reset();
    this.form.get('Note').setValue('');
    this.form.get('ParnerId').setValue(undefined);
    this.form.get('ParnerId').reset();
    this.form.get('DateSinged').setValue(null);
    this.form.get('DateStart').setValue(new Date());
    this.form.get('DateStart').reset();
    this.form.get('DateEnd').setValue(null);
    this.form.get('Status').setValue(0);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }
  returnCustomer(id: string): Customer {
    return this.customers.find(customer => customer.Id === id);
  }

  submit() {
    const data: ContractCooperation = this.form.value;
    this.contractCooperationService.create(this.form.value)
      .then((res) => {
        this.refresh.emit('createLoad');
        swal('Thông báo', 'Khởi tạo hợp đồng khung ' + data.Code + ' Thành công', 'success');
        this.modalRef.hide();
      })
      .catch((err) => {
        swal('Thông báo', 'Có lỗi xảy ra', 'error');
      });
  }
}
