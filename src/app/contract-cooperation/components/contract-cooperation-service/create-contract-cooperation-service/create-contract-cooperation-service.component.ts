import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContractCooperation, ContractCooperationService, Telecom } from 'src/app/contract-cooperation/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContractCooperationServiceService } from 'src/app/contract-cooperation/services';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-contract-cooperation-service',
  templateUrl: './create-contract-cooperation-service.component.html',
  styleUrls: ['./create-contract-cooperation-service.component.scss'],
  providers: [DatePipe],
})
export class CreateContractCooperationServiceComponent implements OnInit {
  @Output() useCreate: EventEmitter<ContractCooperationService> = new EventEmitter<ContractCooperationService>();
  @Input() contractCooperation: ContractCooperation;
  @Input() services: Telecom[] = [];
  modalRef: BsModalRef;
  form: FormGroup;
  selectedFile: any;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private service: ContractCooperationServiceService,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.initForm();
  }
  async openModal(template: TemplateRef<any>) {
    if (this.services.length === 0) {
      swal('Thông báo', 'Tất cả dịch vụ hợp tác đã được chọn! Vui lòng thêm mới ở trang quản lý dịch vụ hoặc sử dụng dịch vụ hợp đồng khung có sẵn', 'info');
    } else {
      this.initForm();
      this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
    }
  }
  initForm() {
    if (this.form) {
      this.form.get('ServiceId').reset();
      this.form.get('Percentage').reset();
      this.form.get('DateStart').reset();
      this.form.get('DateEnd').reset();
      this.form.get('Note').reset();
    } else {
      this.form = this.fb.group({
        ServiceId: [undefined, [Validators.required]],
        Percentage: [undefined, [Validators.required, Validators.min(1), Validators.max(100)]],
        DateStart: [null, [Validators.required]],
        DateEnd: [null, [Validators.required]],
        Note: [undefined],
      });
    }
  }
  submit() {
    const data = this.form.value;
    data.DateStart = this.datepipe.transform(data.DateStart, 'yyyy-MM-dd');
    data.DateEnd = this.datepipe.transform(data.DateEnd, 'yyyy-MM-dd');
    data.CooperationContractId = this.contractCooperation.Id;
    this.service.create(data).then(async (res) => {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        await this.service.updateFile(res.Id, formData).then((r) => {

        }).catch((err) => {
          swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
        });
      }
      this.modalRef.hide();
      swal('Tạo mới thành công', '', 'success');
      this.useCreate.emit(res);
      this.selectedFile = undefined;
    }).catch((err) => {
      swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
    });
  }
  onChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
