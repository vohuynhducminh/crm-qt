import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContractCooperationSubService, ContractCooperationCustomerService, TelecomService } from 'src/app/contract-cooperation/services';
import { ContractCooperationSub, Telecom, Customer, ContractCooperation, ContractCooperationService } from 'src/app/contract-cooperation/models';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-cooperation-sub',
  templateUrl: './contract-cooperation-sub.component.html',
  styleUrls: ['./contract-cooperation-sub.component.scss'],
})
export class ContractCooperationSubComponent implements OnInit, OnChanges {
  @Input() contractCooperation: ContractCooperation = new ContractCooperation();
  @Input() services: { CoContractService: ContractCooperationService, Service: Telecom }[] = [];
  data: ContractCooperationSub[] = [];
  listTypes = [{ value: 0, label: 'TTVT ký hợp đồng con với KH' }, { value: 1, label: 'Đối tác ký hợp đồng con với KH' }, { value: 2, label: 'TTVT, đối tác cùng ký hợp đồng con với KH' }];
  customers: Customer[] = [];
  canActive = {
    create: false,
    update: false,
  };
  constructor(
    private contractCooperationSubService: ContractCooperationSubService,
    private contractCooperationCustomerService: ContractCooperationCustomerService,
    public authService: AuthGuardService
  ) {
    this.canActive.create = authService.checkAccess(['telecom', 'contract-cooperation', 'create']);
    this.canActive.update = authService.checkAccess(['telecom', 'contract-cooperation', 'update']);
  }
  id: string;
  selected = [];

  async ngOnInit() {
    await this.loadCustomer();
  }

  async  ngOnChanges(changes: SimpleChanges) {
    if (changes['contractCooperation']) {
      await this.loadContract();
    }
  }
  async loadContract() {
    await this.contractCooperationSubService.getAll()
      .then((res) => {
        this.data = res.filter(e => e.CooperationContractId === this.contractCooperation.Id);
        if (this.id) {
          this.selected = [this.data.find((e) => e.Id === this.id)];
        } else {
          this.selected = [];
        }
      });
  }
  async loadCustomer() {
    await this.contractCooperationCustomerService.getAll()
      .then((res) => this.customers = res.map(e => e));
  }
  viewInfo(id: string) {

  }
  returnCustomer(id: string): Customer {
    return this.customers.find(customer => customer.Id === id);
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
        this.contractCooperationSubService.delete(this.id)
          .then((res) => {
            this.data = this.data.filter((e) => e.Id !== this.id);
            this.selected = [];
            this.id = undefined;
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

  onSelect({ selected }) {
    this.id = selected[0].Id;
  }

  returnType(value: number) {
    return this.listTypes.find(e => e.value === value).label;
  }

  returnCoNotClose(): { CoContractService: ContractCooperationService, Service: Telecom }[] {
    return this.services.filter((e) => !e.CoContractService.IsClosed);
  }
}
