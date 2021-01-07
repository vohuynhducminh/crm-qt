import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'kudo-manafile',
  templateUrl: './kudo-manafile.component.html',
  styleUrls: ['./kudo-manafile.component.scss'],
})
export class KudoManafileComponent implements OnInit {
  @Input() HeaderTitle: string;
  @Input() AllowedUpload = false;
  @Input() UploadUrl: string;
  @Input() Icons: string[] = ['fa-folder', 'fa-folder-open'];
  @Input() FileNameProp: string;
  @Input() FileDateProp: string;
  @Input() FileLinkProp: string;
  @Input() ShowApplyButtonProp: string;
  @Input()
  set FileList(fileList: Object[]) {
    if (fileList) {
      this._fileList = fileList;
      this.filteredData = [...this._fileList];
    }
  }

  @Output() UploadChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() ApplyButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnFileClick: EventEmitter<any> = new EventEmitter<any>();

  _fileList: Object[];
  filteredData: Object[];
  searchValue: string;

  constructor(
    private modalService: BsModalService
  ) { }

  modalRef: BsModalRef;

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  openFile(url: string, target: string) {
    open(url, target);
  }

  updateFilter() {
    console.log(this.searchValue);

    // filter our data
    const temp = this._fileList.filter(
      (d) => this.getNameValue(d).toLowerCase().indexOf(this.searchValue) !== -1 || !this.searchValue
    );

    // update the rows
    this.filteredData = temp;
  }

  getNameValue(element) {
    let result = element;
    if (this.FileNameProp) {
      const arrProp = this.FileNameProp.split('.');
      for (let i = 0; i < arrProp.length; i++) {
        result = result[arrProp[i]];
      }
    }
    return result;
  }

  getDateValue(element) {
    let result = '';
    if (this.FileDateProp) {
      result = element;
      const arrProp = this.FileDateProp.split('.');
      for (let i = 0; i < arrProp.length; i++) {
        result = result[arrProp[i]];
      }
    }
    return result;
  }

  getLinkValue(element) {
    let result = '';
    if (this.FileLinkProp) {
      result = element;
      const arrProp = this.FileLinkProp.split('.');
      for (let i = 0; i < arrProp.length; i++) {
        result = result[arrProp[i]];
      }
    }
    return result;
  }

  isShowApplyButtonValue(element) {
    let result = false;
    if (this.ShowApplyButtonProp) {
      result = element;
      const arrProp = this.ShowApplyButtonProp.split('.');
      for (let i = 0; i < arrProp.length; i++) {
        result = result[arrProp[i]];
      }
    }
    return result;
  }

  changeHandler() {
    this.UploadChange.emit();
    this.searchValue = '';
  }

  applyButtonHandler(item: any) {
    this.ApplyButton.emit(item);
  }

  onFileClickHandler(item: any) {
    this.OnFileClick.emit(item);
  }

}
