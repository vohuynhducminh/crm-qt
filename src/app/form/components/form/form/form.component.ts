import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormService } from 'src/app/form/services/form.service';
import { FormVM, FormFormGroups } from 'src/app/form/models/form';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: FormVM[] = [] ;
  filteredData: FormVM[] = [];
  modalRef: BsModalRef;
  selecting: FormVM;
  selectedId: string;
  formResponse: FormFormGroups;
  constructor(
    private formService: FormService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.formService.getForm()
      .then((response: FormVM[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch(error => console.error(error));
  }

  updateFilter(event) {
    const searchValue = event.target.value.toLowerCase();

    // filter our data
    const temp = this.data.filter(
      (d) => d.Name.toLowerCase().indexOf(searchValue) !== -1 || !searchValue
    );

    // update the rows
    this.filteredData = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  deleteForm(form: FormVM) {
    this.formService.deleteForm(form)
      .then(() => {
        this.getData();
        this.selecting = null;
      })
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

  openUpdateModal(form: FormVM) {
    let formFormGroups: FormFormGroups;
    this.formService.getFormFormGroupById(form.Id)
      .then(
        res => formFormGroups = res
      )
      .then(() => {
          this.modalRef = this.modalService.show(
            EditFormComponent,
            { initialState: { formFormGroups }, class: 'modal-kd', ignoreBackdropClick: true }
          );
          this.modalRef.content.refresh.subscribe(() => {
            this.getData();
            this.refreshPreviewForm();
          });
        }
      )
      .catch(error => console.log(error));
    // console.log('FormVM: ', form.Id);
  }

  refreshPreviewForm() {
    this.formService.getFormFormGroupById (this.selecting.Id)
    .then(
      form => {
        this.formResponse = form;
      }
    )
    .catch(e => console.log(e));
  }

  onSelect({ selected }) {
    if (selected) {
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
    this.formService.getFormFormGroupById(this.selecting.Id)
    .then(
      form => {
        this.formResponse = form;
      }
    )
    .catch(e => console.log(e));
  }
}
