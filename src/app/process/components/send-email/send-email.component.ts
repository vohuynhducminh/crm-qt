import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SendEmailService } from '../../services/send-email.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  @ViewChild('sendEmailSuccessSwal') private sendEmailSuccessSwal: SwalComponent;
  @ViewChild('attachFiles') private attachFilesHtml: any;
  @ViewChild('quillEditor') private quillEditor: any;
  modalRef: BsModalRef;
  attachFiles: any[];
  editorModules = {
    // https://github.com/KillerCodeMonkey/ngx-quill
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
    ],
  };
  form: FormGroup;
  isShowQuill = false;

  disableSubmit = false;

  constructor(
    private modalService: BsModalService,
    private sendEmailService: SendEmailService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      ToMail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      Cc: new FormControl(''),
      Subject: new FormControl('', [Validators.required]),
      Message: new FormControl(''),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.disableSubmit = false;
    this.initFormGroup();
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
    this.isShowQuill = true;
  }

  sendEmail() {
    if (this.form.valid) {
      const formData: any = new FormData();
      formData.append('ToMail', this.form.controls['ToMail'].value);
      formData.append('Subject', this.form.controls['Subject'].value);
      formData.append('Message', this.form.controls['Message'].value);
      if (this.form.controls['Cc'].value) {
        formData.append('Cc', !!this.form.controls['Cc'].value ?
          this.form.controls['Cc'].value.split(',').map(cc => cc.trim()) :
          []
        );
      }
      if (this.attachFiles && this.attachFiles.length > 0) {
        for (let index = 0; index < this.attachFiles.length; index++) {
          const file: File = this.attachFiles[index];
          formData.append('Files', file);
        }
      }
      this.sendEmailService.sendMail(formData)
        .then(
          () => {
            this.sendEmailSuccessSwal.show().then(() => {
              this.attachFilesHtml = '';
              this.isShowQuill = false;
              this.modalService.hide(1);
            });
          },
          error => {
            console.log(error);
            this.disableSubmit = false;
          }
      );
    }
  }

  disableSubmitForm() {
    this.disableSubmit = true;
    this.sendEmail();
  }

  onSelectFiles(event: any) {
    this.attachFiles = event.target.files;
  }

}
