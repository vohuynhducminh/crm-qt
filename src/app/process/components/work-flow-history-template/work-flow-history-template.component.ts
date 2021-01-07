import { Component, OnInit, Input, OnChanges, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HistoryService } from '../../services/history.service';
import { FormService } from 'src/app/form/services/form.service';
import { ContractService } from '../../services/contract.service';
import { DynamicFormComponent } from 'src/app/core/components/form/dynamic-form/dynamic-form.component';
import { ContractCM } from '../../models/contract';
import { GlobalService } from 'src/app/core/services/global.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Customer } from 'src/app/customer/models/customer';

@Component({
  selector: 'app-work-flow-history-template',
  templateUrl: './work-flow-history-template.component.html',
  styleUrls: ['./work-flow-history-template.component.scss'],
})
export class WorkFlowHistoryTemplateComponent implements OnInit {
  @ViewChild(DynamicFormComponent) contractForm: DynamicFormComponent;
  @ViewChild('confirmCreateContractSwal') confirmCreateContractSwal: SwalComponent;
  @ViewChild('createContractErrorSwal') createContractErrorSwal: SwalComponent;
  @Input() showFile: boolean;
  @Input()
  set historyId(historyId: string) {
    if (history) {
      this._historyId = historyId;
      this.getTemplates();
    }
  }
  @Input()
  set CurrentCustomer(currentCustomer: Customer) {
    this._currentCustomer = currentCustomer;
  }

  _historyId: string;
  _currentCustomer: Customer;
  downloadApiEndPoint: string;
  serverFiles = [];
  selectedTemplate: any;
  formGroups = [];
  formValue: any;
  swalPreConfirm: any;

  constructor(
    private globalService: GlobalService,
    private historyService: HistoryService,
    private formService: FormService,
    private contractService: ContractService,
    private modalService: BsModalService
  ) { }

  modalRef: BsModalRef;

  ngOnInit() {
    this.downloadApiEndPoint = `${environment.endPoint}${environment.apiPaths.workFlowHistory.downloadFile}`;
    this.swalPreConfirm = () => this.createContract();
  }

  openModal(template: TemplateRef<any>, item: any) {
    this.selectedTemplate = item;
    if (this.selectedTemplate && this.selectedTemplate.FormId) {
      this.getForm()
        .then(() => {
          this.modalRef = this.modalService.show(template, { class: 'modal-kd-lg', ignoreBackdropClick: true });
        });
    }
  }

  getTemplates() {
    if (this._historyId) {
      this.historyService.getTemplates(this._historyId)
        .then(
          (response) => {
            this.serverFiles = response;
          }
        )
        .catch(error => console.error(error));
    }
  }

  async getForm() {
    const response = await this.formService.getFormFormGroupById(this.selectedTemplate.FormId);
    if (response) {
      this.formGroups = response.FormGroups.map(e => {
        e.FieldType = 'read-write';
        e.IsCurrent = true;
        return e;
      });
    }
  }

  openSwal(event: any) {
    this.formValue = event;
    this.confirmCreateContractSwal.show();
  }

  async createContract() {
    const templateData = this.globalService.parseObject(
      this.formValue,
      {
        matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        changeFormat: 'DD/MM/YYYY',
      }
    );
    console.log(templateData);
    const contractCM: ContractCM = {
      TemplateId: this.selectedTemplate.Id,
      WorkFlowHistoryId: this._historyId,
      Data: templateData,
    };
    return this.contractService.createContract(contractCM)
      .then(
        (response) => {
          const fileId = response;
          console.log(fileId);
          this.modalRef.hide();
          this.contractService.downloadContractFile(fileId.Id)
            .then(
              (file) => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(file);
                link.download = this.selectedTemplate.Name;
                link.click();
              },
              error => console.error(error)
            );
        },
        (error) => {
          console.error(error);
          this.createContractErrorSwal.show();
        }
      );
  }

  onFileClick(item: any) {
    this.historyService.downloadHistoryFile(item.Id)
      .then(
        (file) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(file);
          link.download = item.Name;
          link.click();
        },
        error => console.error(error)
      );
  }

}
