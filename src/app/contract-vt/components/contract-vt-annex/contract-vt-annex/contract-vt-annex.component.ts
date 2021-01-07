import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {
  ContractVtAnnex,
  ContractVt,
  TelecomServiceModel,
} from 'src/app/contract-vt/models';
import {
  ContractVtService,
  ContractVtAnnexService,
  TelecomService,
} from 'src/app/contract-vt/services';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-vt-annex',
  templateUrl: './contract-vt-annex.component.html',
  styleUrls: ['./contract-vt-annex.component.scss'],
})
export class ContractVtAnnexComponent implements OnInit {
  annexs: ContractVtAnnex[] = [];
  objSelected: ContractVtAnnex;
  modalRef: BsModalRef;
  contract: ContractVt;
  selected = [];
  services: TelecomServiceModel[] = [];
  id: String;
  canActive = {
    create: false,
    update: false,
    end: false,
  };
  constructor(
    private contractVtSerivce: ContractVtService,
    private annexService: ContractVtAnnexService,
    private router: ActivatedRoute,
    private modalService: BsModalService,
    private telecomService: TelecomService,
    public authService: AuthGuardService
  ) {
    this.canActive.create = authService.checkAccess(['telecom', 'contract', 'create']);
    this.canActive.update = authService.checkAccess(['telecom', 'contract', 'update']);
    this.canActive.end = authService.checkAccess(['telecom', 'contract', 'end']);
  }

  async ngOnInit() {
    await this.telecomService.getAll().then((res) => (this.services = res));
    await this.init();
  }
  init() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.contractVtSerivce.getById(id).then((res) => {
        this.contract = res;
      });
      this.contractVtSerivce
        .getAppendixById(id)
        .then((list) => {
          this.annexs = list;
          if (this.objSelected) {
            this.objSelected = this.annexs.find(
              (e) => e.Id === this.objSelected.Id
            );
            this.selected = [this.objSelected];
          } else {
            this.selected = [];
            this.objSelected = undefined;
          }
        })
        .catch((err) => (this.annexs = []));
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      ignoreBackdropClick: true,
      class: 'modal-lg',
    });
  }

  onSelect(event: any) {
    // this.detail.openModal(event.selected[0].Id);
    this.objSelected = event.selected[0];
    this.annexs = [...this.annexs];
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
        this.annexService
          .delete(this.objSelected.Id)
          .then(() => {
            swal('Thông báo', 'Xóa phụ lục thành công', 'success');
            this.objSelected = undefined;
            this.init();
          })
          .catch((err) => swal('Thông báo', 'Xóa thất bại', 'error'));
      }
    });
  }
  payOff() {
    swal({
      title: 'Quyết định thanh lý phụ lục này?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value) {
        this.annexService
          .payOff(this.objSelected.Id)
          .then(() => {
            swal('Thông báo', 'Thanh lý thành công', 'success');
            this.objSelected.Status = -1;
            this.annexs[
              this.annexs.findIndex((e) => e.Id === this.objSelected.Id)
            ] = this.objSelected;
            this.selected = [this.objSelected];
          })
          .catch((err) => swal('Thông báo', 'Thanh lý thất bại', 'error'));
      }
    });
  }
}
