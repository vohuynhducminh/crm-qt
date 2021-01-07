import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Role } from 'src/app/security/models/role';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleService } from 'src/app/security/services/role.service';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  data: Role[] = [];
  filteredData: Role[] = [];

  modalRef: BsModalRef;
  selecting: { Id: string, Name: string, Father: string };
  demo: { Name: string, data: { Id: string, Name: string, Father: string }[] }[] = [];
  demoSelected: { Name: string, data: { Id: string, Name: string, Father: string }[] };
  selected = [];
  selectedChild = [];
  searchDemo: { Name: string, data: { Id: string, Name: string, Father: string }[] }[] = [];
  searchSelecting: { Id: string, Name: string, Father: string }[] = [];
  demoName = '';
  demoSelectedName = '';
  constructor(
    private roleService: RoleService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.roleService.getRole()
      .then((response: Role[]) => {
        this.data = response;
        this.demo = [];
        for (let i = 0; i < response.length; i++) {
          const role = response[i];
          const data = role.Name.split('---');
          const index = this.demo.findIndex((e) => e.Name === data[0]);
          if (index > -1) {
            this.demo[index].data.push({
              Id: role.Id,
              Name: data[1],
              Father: data[0],
            });
          } else {
            this.demo.push({
              Name: data[0],
              data: [{
                Id: role.Id,
                Name: data[1],
                Father: data[0],
              }],
            });
          }
        }
        if (this.demoSelected) {
          this.demoSelected = this.demo.find((e) => e.Name === this.demoSelected.Name);
          if (this.demoSelected) {
            this.selected = [this.demoSelected];
            if (this.selecting) {
              this.selecting = this.demoSelected.data.find((e) => e.Name === this.selecting.Name);
              this.selectedChild = [this.selecting];
            } else {
              this.selectedChild = [];
            }
          } else {
            this.selected = [];
          }
        }
        this.searchDemo = this.demo;
      })
      .catch(error => console.error(error));
  }

  updateFilter = (name: string) => {
    if (name === 'quiTrinh') {
      this.searchDemo = this.demo.filter(e => e.Name.toLowerCase().includes(this.demoName.toLowerCase()));
    }
    if (name === 'nhanVien') {
      this.searchSelecting = this.demoSelected.data.filter(e => e.Name.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D').toLowerCase().includes(this.demoSelectedName.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D').toLowerCase()));
    }
  }

  onSelect({ selected }) {
    this.selectedChild = selected;
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }

  }
  onSelectDemo({ selected }) {
    this.demoName = '';
    this.demoSelectedName = '';
    this.selecting = undefined;
    this.demoSelected = selected[0];
    this.selected = selected;
    this.searchSelecting = [...this.demoSelected.data];
  }

  openUpdateModal(role: { Id: string, Name: string, Father: string }) {
    this.modalRef = this.modalService.show(EditRoleComponent, { initialState: { role }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  deleteRole(role: { Id: string, Name: string, Father: string }) {
    this.roleService.deleteRole(role)
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
