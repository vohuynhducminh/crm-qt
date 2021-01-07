import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BasicService } from 'src/app/service/services';
import { CommonServiceSubCM, CommonServiceSubUM, CommonServiceSubVM, CommonServiceCM, CommonServiceUM, CommonServiceVM } from 'src/app/service/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-common-service-sub',
  templateUrl: './list-common-service-sub.component.html',
  styleUrls: ['./list-common-service-sub.component.scss'],
})
export class ListCommonServiceSubComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() commons: CommonServiceVM[] = [];
  common: CommonServiceVM;
  serviceSelected: CommonServiceSubVM;
  selected = [];
  name = '';
  searchNames: CommonServiceSubVM[] = [];

  constructor(
    private service: BasicService<CommonServiceSubVM, CommonServiceSubCM, CommonServiceSubUM>,
    private commonService: BasicService<CommonServiceVM, CommonServiceCM, CommonServiceUM>
  ) { }

  ngOnInit() {
    if (this.id) {
      this.useLoadData();
    }
  }

  ngOnChanges() {
    if (this.id) {
      this.useLoadData();
    }
  }

  useFilter = () => {
    this.searchNames = this.common.TelecomserviceVMs.filter(item => item.Name.toLowerCase().includes(this.name.toLowerCase()));
  }

  useLoadData = () => {
    this.commonService.useGetById('common_telecom_service', this.id)
      .then((res) => {
        this.common = res;
        this.useFilter();
        if (this.serviceSelected) {
          this.serviceSelected = res.TelecomserviceVMs.find((e) => e.Id === this.serviceSelected.Id);
          if (this.serviceSelected) {
            this.selected = [this.serviceSelected];
          } else {
            this.selected = [];
          }
        }
      }).catch(() => {
        swal('Thông báo', 'Không tìm thấy dịch vụ ' + this.common.Name, 'error');
      });
  }

  useSelect = ({ selected }: { selected: CommonServiceSubVM[] }) => {
    this.serviceSelected = selected[0];
  }

  useDelete = () => {
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
        this.service.useDelete('telecom_service', this.serviceSelected.Id).then(() => {
          swal('Thông báo', 'Xóa dịch vụ ' + this.serviceSelected.Name + ' thành công', 'success');
          this.common.TelecomserviceVMs = this.common.TelecomserviceVMs.filter((e) => e.Id !== this.serviceSelected.Id);
          this.serviceSelected = undefined;
        }).catch((err) => {
          if (err.error.Message && err.error.Message.includes('Dich vu dang duoc su dung trong')) {
            swal('Thông báo', 'Dịch vụ ' + this.serviceSelected.Name + ' đang được sử dụng', 'error');
          } else {
            swal('Thông báo', 'Có lỗi xảy ra', 'error');
          }
        });
      }
    });
  }

  useGetRootService = (id: string) => {
    return this.commons.find((e) => e.Id === id);
  }

}
