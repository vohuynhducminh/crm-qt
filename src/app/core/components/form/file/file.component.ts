import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormField, FileVM } from 'src/app/core/models/form-field';
import { FormGroup } from '@angular/forms';
import { FileActionService } from 'src/app/core/services/file-action.service';

@Component({
  template: `
    <div class="form-group form-group-default">
      <label>{{field.Label}}</label>
      <div *ngIf="field.FileConfig.FileType && field.FileConfig.FileType.includes('read')">
        <ng-container *ngTemplateOutlet="list"></ng-container>
        <div *ngIf="field.FileConfig.FileType.includes('write') && field.IsCurrent">
          <ng-container *ngTemplateOutlet="input"></ng-container>
        </div>
      </div>
      <ng-template #input>
        <pg-upload
          [Multiple]="true"
          [Action]="field.FileConfig.UploadUrl"
          [ShowUploadList]="false"
          (Change)="onChangeFile($event)"
          progressType="circle">
          <div class="d-flex flex-column align-items-center">
            <h4 class="semi-bold no-margin">Thả file để tải lên</h4>
            <p>hoặc nhấp vào đây</p>
          </div>
        </pg-upload>
      </ng-template>
      <ng-template #list>
        <div class="d-flex flex-column align-items-center" *ngIf="!field.FileConfig.FileList || field.FileConfig.FileList.length === 0">
          <p>File không sẵn có!</p>
        </div>
        <div
          class="kudo-file"
          *ngFor="let file of field.FileConfig.FileList; let i = index">
          <a
            class="kudo-link"
            href="javascript:void(0)"
            (click)="onFileClick(file)">
            <i class="fa fa-file file-icon"></i>
            <span class="file-info">
              {{file.Name}}
              <span class="date-time">
                {{file.Date | date: 'dd-MM-yyyy'}}
                <span class="divider"></span>
                {{file.Date | date: 'HH:mm:ss'}}
              </span>
            </span>
          </a>
          <i
            class="pg pg-close ml-auto delete-icon"
            *ngIf="field.FileConfig.FileType.includes('write') && field.IsCurrent"
            [tooltip]="'Xóa file'"
            [placement]="'left'"
            (click)="onDeleteFile(file, i)">
          </i>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      a.kudo-link {
        display: flex;
        flex: 1;
        align-items: center;
      }
      div.kudo-file {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        min-height: 20px;
        width: 100%;
      }
      div.kudo-file:hover {
        background-color: #daeffd;
      }
      div.kudo-file:hover > i.delete-icon {
        visibility: visible;
      }
      i.file-icon {
        font-size: 30px;
        padding-right: 10px;
      }
      i.delete-icon {
        color: #7a8994;
        visibility: hidden;
        cursor: pointer;
      }
      span.file-info > span.date-time {
        display: block;
        color: #aaaaaa;
        font-weight: normal;
      }
      span.file-info > span.date-time > span.divider::before {
        content: '-';
        margin-left: 5px;
        margin-right: 5px;
      }
    `,
  ],
})
export class FileComponent implements OnInit {
  field: FormField;
  group: FormGroup;
  fieldChange: EventEmitter<any>;

  constructor(private fileActionService: FileActionService) { }

  ngOnInit() {
    FormField.buildUrl(this.field);
  }

  onChangeFile({ file }) {
    if (file.response) {
      this.field.FileConfig.FileList.unshift(file.response);
      FormField.buildUrl(this.field);
      if (this.fieldChange) {
        this.fieldChange.emit();
      }
    }
  }

  onFileClick(file: FileVM) {
    this.fileActionService.downloadFile(file.DownloadUrl)
      .then(
        (fileRes) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(fileRes);
          link.download = file.Name;
          link.click();
        },
        error => console.error(error)
      );
  }

  onDeleteFile(file: FileVM, index: number) {
    this.fileActionService.deleteFile(file.DeleteUrl)
      .then(
        () => {
          this.field.FileConfig.FileList.splice(index, 1);
          if (this.fieldChange) {
            this.fieldChange.emit();
          }
        },
        error => console.error(error)
      );
  }

}
