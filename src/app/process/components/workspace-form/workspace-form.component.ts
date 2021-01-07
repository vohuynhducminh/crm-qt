import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormField } from 'src/app/core/models/form-field';
import { DynamicFormComponent } from 'src/app/core/components/form/dynamic-form/dynamic-form.component';
import { HistoryComponent } from '../history/history.component';
import { WorkFlowHistoryFileComponent } from '../work-flow-history-file/work-flow-history-file.component';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.scss'],
})
export class WorkspaceFormComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  @Input()
  set formGroups(formGroups: FormField[]) {
    if (formGroups) {
      this._formGroups = formGroups.map(e => {
        const fg = {...e};
        fg.WorkFlowHistoryId = this.history._customerWorkFlowId;
        return fg;
      });
    } else {
      this._formGroups = null;
    }
  }
  @Input() formData: Object;
  @Input() showForm = true;
  @Input() history: HistoryComponent;
  @Input() file: WorkFlowHistoryFileComponent;

  _formGroups: FormField[];

  constructor() { }

  ngOnInit() {
  }

  reloadHistoryFiles() {
    if (this.file) {
      this.file.getFiles();
    }
  }

}
