import { Component, OnInit, EventEmitter, OnDestroy, ViewChild} from '@angular/core';
import { FormFormGroups, FormUM, GlobalVariableVM } from 'src/app/form/models/form';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { FormService } from 'src/app/form/services/form.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';
import { DynamicFormComponent } from 'src/app/core/components/form/dynamic-form/dynamic-form.component';
import { WorkFlow } from 'src/app/work-flow/models/work-flow';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit, OnDestroy {
  // @ViewChild('appDynamicForm') huy: DynamicFormComponent;
  refresh: EventEmitter<any> = new EventEmitter<any>();
  typeFormat = environment.typeFormat.FULL_DATE;
  fieldTypeList = environment.typeFormat.TYPE;
  inputTypeList = environment.typeFormat.INPUT_TYPE;
  classList = environment.typeFormat.CLASS_LIST;
  inputMask = environment.typeFormat.INPUT_MASK;
  methodList = [
    'GET', 'POST',
  ];
  workFlowList: WorkFlow[];
  validateUpdateForm: FormGroup;
  errorFormUM = '';
  chooseFormGroup = 0;
  chooseFormula = 0;
  isDragable = true;
  globalVariableList: GlobalVariableVM[];
  subs = new Subscription();
  FormGroupListName: string[];
  constructor(
    private formBuilder: FormBuilder,
    public modalRef: BsModalRef,
    private formService: FormService,
    private dragulaService: DragulaService
  ) {
  }

  formFormGroups: FormFormGroups;
  ngOnInit() {
    this.registerUpdateForm();
    this.registerDragAndDrop();
    // this.getGlobalVariable();
    this.getFormGroupListName();
    this.getWorkFlowList();
    // console.log(this.huy.form.value);
  }

  ngOnDestroy() {
    this.dragulaService.destroy('FORM-GROUP-EDIT');
    this.dragulaService.destroy('FORM-OPTION-EDIT');
    this.subs.unsubscribe();
  }
  getFormGroupListName() {
    this.FormGroupListName =
    this.getFormArray(this.validateUpdateForm, 'FormGroupFields').value.map(
      element => element.Name
    );
  }
  // WorkFlow And GlobalVarible Control
  getGlobalVariable() {
    // this.formService.getGlobalVariableByWorkFlowId('812518bf-334e-4fc8-2692-08d67f678489')
    // .then(
    //   globalVariableList => {
    //     this.globalVariableList = globalVariableList;
    //   }
    // )
    // .catch(
    //   error => console.log(error)
    // );
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
    this.dragulaService.createGroup('FORM-GROUP-EDIT', {
      removeOnSpill: false,
      revertOnSpill: true,
      ignoreInputTextSelection: true,
      moves: (el, container, handle) => {
        return handle.className === 'card-header';
      },
    });
    this.subs.add(
      this.dragulaService.dragend('FORM-GROUP-EDIT').subscribe(
        () => {
          this.chooseFormGroup = null;
        }
      )
    );
    this.dragulaService.createGroup('FORM-OPTION-EDIT', {
      removeOnSpill: false,
      revertOnSpill: true,
      ignoreInputTextSelection: true,
    });
  }
  // REACTIVE-FORM CONTROL
  registerUpdateForm() {
    // const formulaField = this.createFormulaField();
    this.validateUpdateForm = this.formBuilder.group(
      {
        Form: this.formBuilder.group(
          {
            Id: [''],
            Name: ['', Validators.required],
            Description: [''],
            HsWorkflowId: [''],
            Method: '',
            // Formulas: this.formBuilder.array([formulaField]),
            NumberToWordFields: [],
          }
        ),
        FormGroupFields: this.formBuilder.array([]),
      }
    );
    this.modifyForm();
    this.validateUpdateForm.controls.Form.patchValue(this.formFormGroups.Form);
    (this.validateUpdateForm.controls.FormGroupFields as FormArray)
    .patchValue(this.formFormGroups.FormGroups);
    this.getGlobalVariableByWorkFlowId();
  }

  modifyForm() {
    const formGroups = this.formFormGroups.FormGroups;
    const optionIds = [];
    for (let index = 0; index < (formGroups.length); index++) {
      this.addFormGroupField();
      if (formGroups[index].Options) {
        optionIds.push(index);
      }
    }
    if (optionIds.length !== 0) {
      optionIds.forEach(index => {
        this.getArrayForm(this.validateUpdateForm, 'FormGroupFields')[index]['controls'].Options
        = this.formBuilder.array([]);
        const number = formGroups[index].Options.length;
        for (let j = 0; j < number; j++) {
          this.addOptionField(index);
        }
      });
    }
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
    this.registerUpdateForm();
    this.errorFormUM = '';
  }
  // WorkFlow And GlobalVarible Control
  getGlobalVariableByWorkFlowId() {
    this.formService.getGlobalVariableByWorkFlowId(this.validateUpdateForm.controls.Form['controls']['HsWorkflowId'].value)
      .then(
        (globalVariableList) => {
          this.globalVariableList = globalVariableList;
        },
        error => console.error(error)
      );
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
  // FORM-GROUP-EDITCONTROL
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
      GlobalVariableId: null,
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
    const form = this.validateUpdateForm.get('Form') as FormGroup;
    const items = this.getFormArray(form, 'Formulas');
    items.push(this.createFormulaField());
  }

  deleteFormulaField(index: number) {
    const form = this.validateUpdateForm.get('Form') as FormGroup;
    const items = this.getFormArray(form, 'Formulas');
    items.removeAt(index);
    this.chooseFormula = null;
  }

  addFormGroupField(): void {
    const items = this.getFormArray(this.validateUpdateForm, 'FormGroupFields');
    items.push(this.createFormGroupField());
  }

  deleteFormGroupField(index: number) {
    const items = this.getFormArray(this.validateUpdateForm, 'FormGroupFields');
    items.removeAt(index);
    this.chooseFormGroup = null;
  }

  createOptionField() {
    return this.formBuilder.control('');
  }

  addOptionField(index: number): void {
    const formFieldGroup = this.getArrayForm(this.validateUpdateForm, 'FormGroupFields');
    const items = this.getFormArray(formFieldGroup[index], 'Options');
    items.push(this.createOptionField());
  }

  deleteOptionField(formGroup: FormGroup , index: number): void {
    const items = this.getFormArray(formGroup, 'Options');
    items.removeAt(index);
  }

  // UPDATE FORMUM
  updateForm() {
    if (this.validateUpdateForm.valid) {
      const formGroupFields =
      this.getFormArray(this.validateUpdateForm, 'FormGroupFields');
      for (let i = 0; i <  formGroupFields.length; i++) {
        formGroupFields.at(i).patchValue({Order: i});
        if (formGroupFields.at(i).value.Class &&
        formGroupFields.at(i).value.Class.length === 0) {
            formGroupFields.at(i).patchValue({Class: null});
        }
        formGroupFields.at(i).updateValueAndValidity();
      }
      const formUM: FormUM = {
        Form: this.validateUpdateForm.value.Form,
        FormGroups: this.validateUpdateForm.value.FormGroupFields,
      };
      this.formService.updateForm(formUM)
        .then(() => {
          this.modalRef.hide();
          this.refresh.emit();
        })
        .catch(error => console.error(error));
    } else {
      this.errorFormUM = 'Please enter required fields or duplicated form-group name!';
    }
  }
checkDuplicated(name: string) {
    let result = false;
    if (this.validateUpdateForm.get('FormGroupFields')) {
      const formCheck = this.getArrayForm(this.validateUpdateForm, 'FormGroupFields').filter(
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
        this.getArrayForm(this.validateUpdateForm, 'FormGroupFields').forEach(
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
