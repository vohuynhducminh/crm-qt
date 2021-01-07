import { Component, OnInit, TemplateRef, Input, ViewChild, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventLog, EventLogFile, EventLogCM, EventLogUM } from '../../models/event-log';
import { EventLogService } from '../../services/event-log.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { environment } from 'src/environments/environment';
import { EventLogFileService } from '../../services/event-log-file.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.scss'],
})
export class EventLogComponent implements OnInit {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @Input()
  set workFlowHistoryId(workFlowHistoryId: string) {
    this._workFlowHistoryId = workFlowHistoryId;
    this.getData();
  }

  _workFlowHistoryId: string;
  data: EventLog[] = [];
  selecting: EventLog;
  uploadEventLogFileUrl: string;
  downloadEventLogFileUrl: string;
  fileList: EventLogFile[];

  modalRef: BsModalRef;
  form: FormGroup = new FormGroup({});

  constructor(
    private modalService: BsModalService,
    private eventLogService: EventLogService,
    private formBuilder: FormBuilder,
    private eventLogFileService: EventLogFileService
  ) { }

  ngOnInit() {
    this.uploadEventLogFileUrl = `${environment.endPoint}${environment.apiPaths.eventLogFile.post}?eventLogId=`;
    this.downloadEventLogFileUrl = `${environment.endPoint}${environment.apiPaths.eventLogFile.get}${environment.apiPaths.eventLogFile.file}`;
  }

  registerForm() {
    this.form = this.formBuilder.group({
      Id: new FormControl(null),
      Name: new FormControl(''),
      Type: new FormControl(null),
      Description: new FormControl(null),
      ActionType: new FormControl(null),
      ExecutedDate: new FormControl(null),
    }, { updateOn: 'blur' });
    this.form.patchValue(this.selecting);
    this.form.valueChanges.subscribe(() => {
      this.updateEventLog();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-kd-md', ignoreBackdropClick: true });
  }

  getData() {
    if (this._workFlowHistoryId) {
      this.eventLogService.getEventLogByCustomerWorkFlowId(this._workFlowHistoryId)
        .then(
          (response: EventLog[]) => {
            this.data = response;
          },
          error => console.error(error)
        );
    }
  }

  onSelect({ selected }: any) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
        this.registerForm();
        this.changeHandler();
      }
    }
  }

  changeHandler() {
    if (this.selecting) {
      this.eventLogFileService.getEventLogFilesByEventLogId(this.selecting)
        .then(
          (response: EventLogFile[]) => {
            this.fileList = response;
          },
          error => console.error(error)
        );
    }
  }

  deleteEventLog(eventLog: EventLog) {
    this.eventLogService.removeEventLog(eventLog)
      .then(() => {
        this.getData();
        this.selecting = null;
        this.registerForm();
      })
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

  createEventLog() {
    const eventLogCM: EventLogCM = {
      Name: '',
      Type: null,
      Description: null,
      WorkFlowHistoryId: this._workFlowHistoryId,
      ActionType: null,
      ExecutedDate: null,
    };
    this.eventLogService.createEventLog(eventLogCM)
      .then(
        () => {
          this.getData();
        },
        error => console.error(error)
      );
  }

  updateEventLog() {
    const eventLogUM: EventLogUM = this.form.value;
    console.log(JSON.stringify(this.form.value));
    this.eventLogService.updateEventLog(eventLogUM)
      .then(
        () => {
          this.getData();
        },
        error => console.log(error)
      );
  }

}
