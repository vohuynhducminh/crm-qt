import { Component, OnInit, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContractCooperation, ContractCooperationService, Telecom } from 'src/app/contract-cooperation/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContractCooperationServiceService } from 'src/app/contract-cooperation/services';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update-contract-cooperation-service',
  templateUrl: './update-contract-cooperation-service.component.html',
  styleUrls: ['./update-contract-cooperation-service.component.scss'],
  providers: [DatePipe],
})
export class UpdateContractCooperationServiceComponent implements OnInit {
  @Output() useUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() contractCooperation: ContractCooperation;
  @Input() data: ContractCooperationService;
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
    this.initForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }
  initForm() {
    if (this.data && this.data.AppendixLink) {
      this.selectedFile = { name: this.data.AppendixLink.split('\\')[3] };
    }
    if (this.form) {
      this.form.get('ServiceId').reset();
      this.form.get('Percentage').reset();
      this.form.get('DateStart').reset();
      this.form.get('DateEnd').reset();
      this.form.get('Note').reset();

      this.form.get('ServiceId').setValue(this.data.ServiceId);
      this.form.get('Percentage').setValue(this.data.Percentage);
      this.form.get('DateStart').setValue(this.data.DateStart);
      this.form.get('DateEnd').setValue(this.data.DateEnd);
      this.form.get('Note').setValue(this.data.Note);
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
    data.Id = this.data.Id;
    this.service.update(data).then(async (res) => {
      if (this.selectedFile) {
        if (this.data && this.data.AppendixLink) {
          if (this.selectedFile.name !== this.data.AppendixLink.split('\\')[3]) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            await this.service.updateFile(this.data.Id, formData).then((r) => {

            }).catch((err) => {
              swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
            });
          }
        } else {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          await this.service.updateFile(this.data.Id, formData).then((r) => {

          }).catch((err) => {
            swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
          });
        }

      }
      this.modalRef.hide();
      swal('Cập nhật thành công', '', 'success');
      this.useUpdate.emit(res);
      this.selectedFile = undefined;
    }).catch((err) => {
      console.log(err);
      swal('Có lỗi xảy ra', 'Vui lòng thử lại', 'error');
    });
  }
  onChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
