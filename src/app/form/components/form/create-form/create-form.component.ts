import { Component, OnInit, TemplateRef, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormCM, GlobalVariableVM, FormulaField, Validation } from 'src/app/form/models/form';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormService } from 'src/app/form/services/form.service';
import { DragulaService } from 'ng2-dragula';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit, OnDestroy {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  typeFormat = environment.typeFormat.FULL_DATE;
  inputMask = environment.typeFormat.INPUT_MASK;
  modalRef: BsModalRef;
  fileUL: File;
  fieldTypeList = environment.typeFormat.TYPE;
  inputTypeList = environment.typeFormat.INPUT_TYPE;
  classList = environment.typeFormat.CLASS_LIST;
  methodList = [
    'GET', 'POST',
  ];
  workFlowList: WorkFlow[];
  globalVariableList: GlobalVariableVM[];
  validateCreateForm: FormGroup;
  errorFormCM = '';
  chooseFormGroup = 0;
  chooseFormula = 0;
  isDragable = true;
  checkActiveList = [];
  subs = new Subscription();
  FormGroupListName: string[];
  list = [
    // "ContractNo",
    // "Name",
    // "CurentDate",
    // "Name",
    // "Address",
    // "Email",
    // "Tel",
    // "Fax",
    // "DeputyName",
    // "DeputyPosition",
    // "BankNumber",
    // "BankName",
    // "TaxCode",
    // "OfficeArea",
    // "RentCost",
    // "RoomCost",
    // "ServiceCost",
    // "HandoverDate",
    // "StableYearInNumber",
    // "StableYearInText",
    // "StableYearInNumber",
    // "StableYearInText",
    // "StartDate",
    // "OfficeArea",
    // "TotalDownPayment",
    // "TotalDownPaymentInText",
    // "StartRoomPaymentDate",
    // "StartServicePaymentDate",
    // "ValidYearInNumber",
    // "ValidYearInText",
    // "ContractNoDateRegister",
    // "ContractNoDateOut"
  ];
  constructor(
    private modalService: BsModalService,
    private formService: FormService,
    private dragulaService: DragulaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerCreateForm();
    this.registerDragAndDrop();
    this.getWorkFlowList();
    let x = {
      Name: '',
      Type: 'input',
      InputType: 'text',
    };
    const array: any = [];
    for (let index = 0; index < this.list.length; index++) {
      x.Name = this.list[index];
      array.push(x);
      x = {
        Name: '',
        Type: 'input',
        InputType: 'text',
      };
      this.addFormGroupField();
    }
    this.getFormArray(this.validateCreateForm, 'FormGroupFields').patchValue(array);
    this.getFormGroupListName();
  }

  ngOnDestroy() {
    this.dragulaService.destroy('FORM-GROUP');
    this.dragulaService.destroy('FORM-OPTION');
    this.subs.unsubscribe();
  }
  getFormGroupListName() {
    this.FormGroupListName =
    this.getFormArray(this.validateCreateForm, 'FormGroupFields').value.map(
      element => element.Name
    );
  }
  // WorkFlow And GlobalVarible Control
  onWorkFlowChange(event) {
    this.formService.getGlobalVariableByWorkFlowId(event)
    .then(
      globalVariableList => {
        this.globalVariableList = globalVariableList;
      }
    )
    .catch(
      error => console.log(error)
    );
  }

  getWorkFlowList() {
    this.formService.getWorkFlowList()
    .then(
      workFlowList => {
        this.workFlowList = workFlowList;
      }
    )
    .catch(error => console.error(error));
  }

  // DRAG-DROP CONTROL
  registerDragAndDrop() {

    this.dragulaService.createGroup('FORM-GROUP', {
      removeOnSpill: false,
      revertOnSpill: true,
      ignoreInputTextSelection: true,
      moves: (el, container, handle) => {
        return handle.className === 'card-header';
      },
    });
    this.subs.add(
      this.dragulaService.dragend('FORM-GROUP').subscribe(
        () => {
          this.chooseFormGroup = null;
        }
      )
    );
    this.dragulaService.createGroup('FORM-OPTION', {
      removeOnSpill: false,
      revertOnSpill: true,
      ignoreInputTextSelection: true,
    });
  }

  // REACTIVE-FORM CONTROL
  registerCreateForm() {
    const formGroupField = this.createFormGroupField();
    const formulaField = this.createFormulaField();
    this.validateCreateForm = this.formBuilder.group(
      {
        Form: this.formBuilder.group(
          {
            HsWorkflowId: [null, Validators.required],
            Name: [null, Validators.required],
            Description: null,
            Method: null,
            Formulas: this.formBuilder.array([formulaField]),
            NumberToWordFields: [],
          }
        ),
        FormGroupFields: this.formBuilder.array([formGroupField]),
      }
    );
  }

  getFormArray(formGroup: FormGroup, fieldFormArray: string) {
    const formArray = formGroup.get(fieldFormArray) as FormArray;
    return formArray;
  }

  getArrayForm(formGroup: FormGroup, fieldFormArray: string) {
    const arrayForm = this.getFormArray(formGroup, fieldFormArray).controls;
    return arrayForm as FormGroup[];
  }

  changeModel(event, formGroup: FormGroup) {
    formGroup.controls.Options = this.formBuilder.array(event as FormControl[]);
  }

  resetForm() {
    this.registerCreateForm();
    this.errorFormCM = '';
  }
  // TYPE-CHANGE
  onTypeChange (formGroup: FormGroup, i: number) {
    if (['input'].includes(formGroup.value.Type)) {
      formGroup.controls.InputType = this.formBuilder.control('text', [Validators.required]);
      // formGroup.updateValueAndValidity();
      // return;
    } else {
      formGroup.controls.InputType = this.formBuilder.control(null);
      formGroup.controls.InputMask = this.formBuilder.control(null);
    }
    if (['date'].includes(formGroup.value.Type)) {
      formGroup.controls.DateFormat = this.formBuilder.control('');
      // formGroup.updateValueAndValidity();
      // return;
    } else {
      formGroup.controls.DateFormat = this.formBuilder.control(null);
    }
    if (['radiobutton', 'select'].includes(formGroup.value.Type)) {
      const optionField = this.createOptionField();
      formGroup.controls.Options = this.formBuilder.array([optionField]);
      if (['select'].includes(formGroup.value.Type)) {
        formGroup.controls.SelectMultiple = this.formBuilder.control(false);
      } else {
        formGroup.controls.SelectMultiple = this.formBuilder.control(null);
      }
      // formGroup.updateValueAndValidity();
      // return;
    } else {
      formGroup.controls.Options = this.formBuilder.control(null);
    }
    if (['select-customer', 'select-individual'].includes(formGroup.value.Type)) {
      formGroup.controls.SubLabel = this.formBuilder.control('');
      // formGroup.updateValueAndValidity();
      // return;
    } else {
      formGroup.controls.SubLabel = this.formBuilder.control(null);
    }
    formGroup.updateValueAndValidity();
  }
  onInputTypeChange(formGroup: FormGroup, i: number) {
    formGroup.updateValueAndValidity();
    if (['text'].includes(formGroup.value.InputType)) {
      formGroup.controls.InputMask = this.formBuilder.control(null);
      formGroup.updateValueAndValidity();
      return;
    }
    formGroup.controls.InputMask = this.formBuilder.control(null);
  }
  // FORM-GROUP CONTROL
  getFormGroupSelect(i: number) {
    this.chooseFormGroup = i;
  }

  getFormulaSelect(i: number) {
    this.chooseFormula = i;
  }

  setActive(index: number) {
    if (this.chooseFormGroup === index) {
      return true;
    }
    return false;
  }

  createFormGroupField(): FormGroup {
    const formGroupFields = this.formBuilder.group({
      Type: ['', Validators.required],
      Label: ['Title', Validators.required],
      SubLabel: null,
      InputType: null,
      Name: ['', Validators.required],
      Placeholder: [''],
      DateFormat: null,
      Class: [[]],
      InputMask: null,
      Options: null,
      Validations: [[]],
      Order: 0,
      GlobalVariableId: '',
      SelectMultiple: false,
    });
    return formGroupFields;
  }

  createFormulaField() {
    const formulaField = this.formBuilder.group({
      Name: ['Formula name', Validators.required],
      Fields: this.formBuilder.array([
        this.formBuilder.control(null),
        this.formBuilder.control(null),
        this.formBuilder.control(null),
        this.formBuilder.control(null),
      ]),
    });
    return formulaField;
  }

  addFormulaField(): void {
    const form = this.validateCreateForm.get('Form') as FormGroup;
    const items = this.getFormArray(form, 'Formulas');
    items.push(this.createFormulaField());
  }

  deleteFormulaField(index: number) {
    const form = this.validateCreateForm.get('Form') as FormGroup;
    const items = this.getFormArray(form, 'Formulas');
    items.removeAt(index);
    this.chooseFormula = null;
  }

  addFormGroupField(): void {
    const items = this.getFormArray(this.validateCreateForm, 'FormGroupFields');
    items.push(this.createFormGroupField());
  }

  deleteFormGroupField(index: number) {
    const items = this.getFormArray(this.validateCreateForm, 'FormGroupFields');
    items.removeAt(index);
    this.chooseFormGroup = null;
  }

  // FORM-OPTION CONTROL
  createOptionField() {
    return this.formBuilder.control('');
  }

  addOptionField(index: number): void {
    const formFieldGroup = this.getArrayForm(this.validateCreateForm, 'FormGroupFields');
    const items = this.getFormArray(formFieldGroup[index], 'Options');
    items.push(this.createOptionField());
  }

  deleteOptionField(formGroup: FormGroup , index: number): void {
    const items = this.getFormArray(formGroup, 'Options');
    items.removeAt(index);
  }

  // MODAL CONTROL
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-kd', ignoreBackdropClick: true });
  }

  // CREATE FORMCM
  createForm() {
    if (this.validateCreateForm.valid) {
      const formGroupFields =
        this.getFormArray(this.validateCreateForm, 'FormGroupFields');
      for (let i = 0; i <  formGroupFields.length; i++) {
        formGroupFields.at(i).patchValue({Order: i});
        if (formGroupFields.at(i).value.Class &&
        formGroupFields.at(i).value.Class.length === 0) {
            formGroupFields.at(i).patchValue({Class: null});
        }
        formGroupFields.at(i).updateValueAndValidity();
      }
      const formCM: FormCM = {
        Form: this.validateCreateForm.value.Form,
        FormGroups: this.validateCreateForm.value.FormGroupFields,
      };
      console.log(JSON.stringify(formCM));
      this.formService.createForm(formCM)
        .then(() => {
          this.modalService.hide(1);
          this.refresh.emit();
        })
        .then(() => {
          setTimeout(
            () => {
              this.resetForm();
            },
            3000
          );
        })
        .catch(error => console.error(error));
    } else {
      this.errorFormCM = 'Please enter required fields or duplicated form-group name!';
      console.log(this.validateCreateForm.value);
    }
  }
  checkDuplicated(name: string, fields: string ) {
    let result = false;
    if (this.validateCreateForm.get(fields)) {
      const formCheck = this.getArrayForm(this.validateCreateForm, fields).filter(
        formGroup => formGroup.value.Name === name
      );
      if (formCheck.length > 1) {
        formCheck.forEach(
          form => {
            if (form.get('Name').value !== '') {
              form.get('Name').setErrors({ Duplicated: true });
            }
          }
        );
        result = true;
      }
      if (formCheck.length === 1) {
        this.getArrayForm(this.validateCreateForm, fields).forEach(
          form => {
            if (form.get('Name').value !== '') {
              form.get('Name').setErrors(null);
            } else {
              form.get('Name').setErrors({ required: true });
            }
          }
        );
      }
    }
    return result;
  }
}
