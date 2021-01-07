import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ContractVtAnnexService } from 'src/app/contract-vt/services/contract-vt-annex.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContractVtAnnex, TelecomServiceModel } from 'src/app/contract-vt/models';
import { TelecomService } from 'src/app/contract-vt/services';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detail-contract-vt-annex-u',
  templateUrl: './detail-contract-vt-annex-u.component.html',
  styleUrls: ['./detail-contract-vt-annex-u.component.scss'],
  providers: [DecimalPipe],
})
export class DetailContractVtAnnexUComponent implements OnInit {
  @Output() updateForm = new EventEmitter<string>();
  @Input()
  set ObjSelected(objSelected: ContractVtAnnex) {
    this._id = objSelected ? objSelected.Id : undefined;
    if (this._id) {
      this.loadData();
    } else {
      this.listContractService = [];
    }
  }
  _id: string;
  listContractService: Array<DetailContractVTAnnexUService> = [];
  listService: Array<TelecomServiceModel>;
  viewType = 0;
  note: string;
  noteToShow: string;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private contractVtAnnexService: ContractVtAnnexService,
    private telecomService: TelecomService,
    private decimalPipe: DecimalPipe
  ) { }
  ngOnInit() {
  }

  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }

  loadData() {
    this.telecomService.getAll().then(
      (resu) => {
        this.listService = resu;
        this.contractVtAnnexService.getById(this._id)
          .then((res) => {
            this.viewType = res.Type;
            if (res.Type === 0) {
              this.listContractService = [];
              res.Services = res.Services ? res.Services : [];
              res.Services.forEach(e => {
                let serviceText = 'Ngưng dịch vụ';
                for (const service of this.listService) {
                  if (service.Id === e.TelecomserviceId) {
                    serviceText = service.Name.toString();
                  }
                }
                const dataText = [];

                for (const key in e.Data) {
                  if (e.Data.hasOwnProperty(key)) {
                    dataText.push(key + ':' + e.Data[key]);
                  }
                }
                const detail: DetailContractVTAnnexUService = {} as DetailContractVTAnnexUService;
                detail.Service = serviceText;
                detail.Data = JSON.stringify(dataText);
                detail.UnitAmount = e.UnitAmount;
                detail.Quantity = e.Quantity;
                this.listContractService.push(detail);
              });
            } else {
              this.note = res.Note;
            }

          });
      }
    );


  }
  openModal(template: TemplateRef<any>, noteToShow: string) {
    console.log(noteToShow);
    this.noteToShow = noteToShow;
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true, class: 'modal-lg' });
  }
}

class DetailContractVTAnnexUService {
  Service: string;
  Data: string;
  UnitAmount: Number;
  Quantity: Number;
}
