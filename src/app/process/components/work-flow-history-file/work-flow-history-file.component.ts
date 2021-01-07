import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { HistoryService } from '../../services/history.service';
import { CustomerWorkFlowService } from '../../services/customer-work-flow.service';
import { CustomerWorkFlowFile } from '../../models/customer-work-flow';

@Component({
  selector: 'app-work-flow-history-file',
  templateUrl: './work-flow-history-file.component.html',
  styleUrls: ['./work-flow-history-file.component.scss'],
})
export class WorkFlowHistoryFileComponent implements OnInit, OnChanges {
  @Input() ShowFile = true;
  @Input()
  set CustomerWorkFlowId(customerWorkFlowId: string) {
    this._customerWorkFlowId = customerWorkFlowId;
    this.getFiles();
  }
  @Input()
  set HistoryId(historyId: string) {
    this._historyId = historyId;
    this.getFiles();
  }

  _customerWorkFlowId: string;
  _historyId: string;
  uploadUrl: string;
  downloadApiEndPoint: string;
  serverFiles = [];

  constructor(
    private historyService: HistoryService,
    private customerWorkFlowService: CustomerWorkFlowService
  ) { }

  modalRef: BsModalRef;

  ngOnInit() {
    this.downloadApiEndPoint = `${environment.endPoint}${environment.apiPaths.workFlowHistory.downloadFile}`;
  }

  ngOnChanges() {
    this.uploadUrl = `${environment.endPoint}${environment.apiPaths.workFlowHistory.postFiles}?workFlowHistoryId=${this._historyId}`;
  }

  getFiles() {
    if (this._customerWorkFlowId) {
      this.customerWorkFlowService.getFiles(this._customerWorkFlowId)
        .then(
          (response: CustomerWorkFlowFile[]) => {
            this.serverFiles = response;
          },
          error => console.error(error)
        );
    } else {
      this.serverFiles  = [];
    }
  }

  onFileClick(item: any) {
    if (item.Type === 0) {
      this.customerWorkFlowService.downloadFileGV(item.Id)
        .then(
          (file) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(file);
            link.download = item.Name;
            link.click();
          },
          error => console.error(error)
        );
    } else {
      this.customerWorkFlowService.downloadFileWFH(item.Id)
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

}
