import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { TemplateService } from 'src/app/template/services/template.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss'],
})
export class EditTemplateComponent implements OnInit {
  template;
  validateUpdateTemplate: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
  }
}
