import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BasicService } from 'src/app/service/services';
import { CommonServiceCM, CommonServiceUM, CommonServiceVM } from 'src/app/service/models';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-common-service',
  templateUrl: './list-common-service.component.html',
  styleUrls: ['./list-common-service.component.scss'],
})
export class ListCommonServiceComponent implements OnInit {
  @Output() useChange: EventEmitter<{ id: string, commons: CommonServiceVM[] }> = new EventEmitter();
  commons: CommonServiceVM[] = [];
  commonsSearch: CommonServiceVM[] = [];
  commonSelected: CommonServiceVM;
  name = '';
  selected = [];
  constructor(
    private service: BasicService<CommonServiceVM, CommonServiceCM, CommonServiceUM>
  ) { }

  ngOnInit() {
    this.useLoadData();
  }

  useLoadData = () => {
    this.service.useGetAll('common_telecom_service')
      .then((res) => {
        this.commons = res;
        this.useFilter();
        if (this.commonSelected) {
          this.commonSelected = res.find((e) => e.Id === this.commonSelected.Id);
          this.selected = [this.commonSelected];
          this.useChange.emit({ id: this.commonSelected.Id, commons: this.commons });
        } else {
          this.useChange.emit({ id: undefined, commons: this.commons });
        }
      });
  }
  useSelect = ({ selected }: { selected: CommonServiceVM[] }) => {
    this.commonSelected = selected[0];
    this.commons = [...this.commons];
    this.useChange.emit({ id: this.commonSelected.Id, commons: this.commons });
  }

  useFilter = () => {
    this.commonsSearch = this.commons.filter((e) => e.Name.toLowerCase().includes(this.name.toLowerCase()));
  }
  useDelete = () => {
    this.service.useGetById('common_telecom_service', this.commonSelected.Id).then((res) => {
      if (res.TelecomserviceVMs.length > 0) {
        swal('Thông báo', 'Vui lòng xóa hết dịch vụ con của nhóm dịch vụ ' + res.Name + ' này trước khi xóa', 'warning');
      } else {
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
            this.service.useDelete('common_telecom_service', this.commonSelected.Id).then(() => {
              swal('Thông báo', 'Xóa nhóm dịch vụ ' + res.Name + ' thành công', 'success');
              this.commons = this.commons.filter((e) => e.Id !== this.commonSelected.Id);
              this.commonSelected = undefined;
              this.useChange.emit({ id: undefined, commons: this.commons });
            });
          }
        });
      }
    }).catch((err) => {
      swal('Thông báo', 'Không tìm thấy nhóm dịch vụ này', 'error');
    });
  }
}
