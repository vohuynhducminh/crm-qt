import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContractCooperation, ContractCooperationService, Telecom } from 'src/app/contract-cooperation/models';
import { ContractCooperationServiceService, TelecomService } from 'src/app/contract-cooperation/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contract-cooperation-service',
  templateUrl: './contract-cooperation-service.component.html',
  styleUrls: ['./contract-cooperation-service.component.scss'],
})
export class ContractCooperationServiceComponent implements OnInit {
  @Output() exportCooperationServices: EventEmitter<{ CoContractService: ContractCooperationService, Service: Telecom }[]> = new EventEmitter();
  @Input() contractCooperation: ContractCooperation;
  data: ContractCooperationService[] = [];
  services: Telecom[] = [];
  availableServices: Telecom[] = [];
  availableServicesForUpdate: Telecom[] = [];
  constructor(
    private service: ContractCooperationServiceService,
    private telecomService: TelecomService
  ) { }
  selected: ContractCooperationService;
  async ngOnInit() {
    await this.telecomService.getAll().then((res) => this.services = res);
    await this.initData();
  }
  async initData() {
    await this.service.getAll(this.contractCooperation.Id)
      .then((res) => {
        this.data = res;
        this.availableServices = this.services.filter((e) => res.findIndex(r => r.ServiceId === e.Id) === -1);
        this.exportCooperationServices.emit(res.map(e => {
          return {
            CoContractService: e,
            Service: this.services.find((service) => service.Id === e.ServiceId),
          };
        }));
        this.availableServicesForUpdate = [...this.availableServices];
        if (this.selected) {
          const model = res.find((e) => e.Id === this.selected.Id);
          this.selected = model;
          this.availableServicesForUpdate.push(this.returnService(model.ServiceId));
        }

      }).catch((err) => this.data = []);
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
        this.service.delete(this.selected.Id)
          .then((res) => {
            this.selected = undefined;
            this.initData();
            swal(
              'Thông báo',
              'Xóa thành công',
              'success'
            );
          }).catch((err) => swal(
            'Thông báo',
            'Có lỗi xảy ra',
            'error'
          ));
      }
    });

  }

  close() {
    swal({
      title: 'Quyết định ngừng cung cấp dịch vụ này?',
      text: 'Sau khi ngừng cung cấp sẽ không thể phục hồi!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.service.close(this.selected.Id)
          .then((res) => {
            this.initData();
            swal(
              'Thông báo',
              'Cập nhật thành công',
              'success'
            );
          }).catch((err) => swal(
            'Thông báo',
            'Có lỗi xảy ra',
            'error'
          ));
      }
    });

  }
  useSelect({ selected }) {
    this.selected = selected[0];
    this.availableServicesForUpdate = [...this.availableServices];
    if (this.selected) {
      this.availableServicesForUpdate.push(this.returnService(this.selected.ServiceId));
    }
  }

  returnService(id: string): Telecom {
    return this.services.find(service => service.Id === id);
  }
  downloadFile(link: string) {
    this.service.downloadFile(link);
  }
}
