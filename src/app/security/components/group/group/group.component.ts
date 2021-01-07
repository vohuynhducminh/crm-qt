import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Group } from 'src/app/security/models/group';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GroupService } from 'src/app/security/services/group.service';
import { EditGroupComponent } from '../edit-group/edit-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: Group[] = [];
  filteredData: Group[] = [];
  selecting: Group;
  modalRef: BsModalRef;

  constructor(
    private groupService: GroupService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.groupService.getGroup()
      .then((response: Group[]) => {
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

  onSelect({ selected }) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
  }

  openModal(group: Group) {
    this.modalRef = this.modalService.show(EditGroupComponent, { initialState: { group }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group)
      .then(() => {
        this.getData();
        this.selecting = null;
      })
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
