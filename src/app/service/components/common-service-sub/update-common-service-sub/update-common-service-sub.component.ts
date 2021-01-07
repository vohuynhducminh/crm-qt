import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonServiceVM, CommonServiceSubVM, CommonServiceSubCM, CommonServiceSubUM, CommonServiceUM, CommonServiceSubParameterCM, CommonServiceSubParameterUM, CommonServiceSubParameterVM } from 'src/app/service/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicService } from 'src/app/service/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-common-service-sub',
  templateUrl: './update-common-service-sub.component.html',
  styleUrls: ['./update-common-service-sub.component.scss'],
})
export class UpdateCommonServiceSubComponent implements OnInit {
  @Input() common: CommonServiceVM;
  @Input() commons: CommonServiceVM[];
  @Input() serviceSelected: CommonServiceVM;
  @Output() useChange: EventEmitter<any> = new EventEmitter();
  parameters: CommonServiceSubParameterVM[] = [];
  subParameters: FormGroup[] = [];
  modalRef: BsModalRef;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: BasicService<CommonServiceSubVM, CommonServiceSubCM, CommonServiceSubUM>,
    private parameterService: BasicService<CommonServiceSubParameterVM, CommonServiceSubParameterCM, CommonServiceSubParameterUM>,
    private modalService: BsModalService
  ) { }

  async ngOnInit() {
    this.reloadParam();
    this.form = this.fb.group({
      Id: [undefined],
      Name: [undefined, Validators.required],
      CommonTelecomserviceId: [undefined],
    });
  }
  async reloadParam() {
    await this.parameterService.useGetAll('telecom_service_parameter').then((res) => {
      this.parameters = res;
      if (this.serviceSelected) {
        this.subParameters = [];
        this.parameters.forEach((e) => {
          if (e.TelecomServiceId === this.serviceSelected.Id) {
            this.subParameters.push(this.fb.group({
              Id: [e.Id],
              Name: [e.Name, Validators.required],
              TelecomServiceId: [e.TelecomServiceId],
            }));
          }
        });
      }
    });

  }
  useOpenModal = async (template: TemplateRef<any>) => {
    await this.reloadParam();
    this.form.get('Id').setValue(this.serviceSelected.Id);
    this.form.get('Name').setValue(this.serviceSelected.Name);
    this.form.get('Name').setErrors(undefined);
    this.form.get('CommonTelecomserviceId').setValue(this.common.Id);
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  useUpdate = () => {
    this.service.useUpdate('telecom_service', this.form.value as CommonServiceSubUM)
      .then(() => {
        swal('Thông báo', 'Cập nhật dịch vụ ' + this.form.value.Name + ' thành công', 'success');
        this.modalRef.hide();
        this.useChange.emit();
      }).catch((err) => {
        if (err.error.Message && err.error.Message.includes('Dich vu dang duoc su dung trong')) {
          swal('Thông báo', 'Dịch vụ ' + this.serviceSelected.Name + ' đang được sử dụng', 'error');
        } else {
          swal('Thông báo', 'Có lỗi xảy ra', 'error');
        }
      });
  }

  useDeleteParam = (id: string, i: number) => {
    if (id) {
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
          this.parameterService.useDelete('telecom_service_parameter', id).then((res) => {
            swal('Thông báo', 'Xóa thành công', 'success');
            this.subParameters = this.subParameters.filter((e) => e.value.Id !== id);
          }).catch((err) => {
            swal('Thông báo', 'Có lỗi xảy ra', 'error');
          });
        }
      });
    } else {
      this.subParameters.splice(i, 1);
      this.subParameters = [...this.subParameters];
    }

  }

  useCreateParam = (data: FormGroup) => {
    this.parameterService.useCreate('telecom_service_parameter', data.value).then((res) => {
      swal('Thông báo', 'Tạo thành công', 'success');
      data.get('Id').setValue(res.Id);
    }).catch((err) => {
      swal('Thông báo', 'Có lỗi xảy ra', 'error');
    });
  }

  useUpdateParam = (data: FormGroup) => {
    this.parameterService.useUpdate('telecom_service_parameter', data.value).then((res) => {
      swal('Thông báo', 'Cập nhật thành công', 'success');
    }).catch((err) => {
      swal('Thông báo', 'Có lỗi xảy ra', 'error');
    });
  }

  useAddParam = () => {
    this.subParameters.push(this.fb.group({
      Id: [undefined],
      Name: [undefined, Validators.required],
      TelecomServiceId: [this.serviceSelected.Id],
    }));
  }
}
