import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/category/models/category';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  data: Category[] = [];
  filteredData: Category[] = [];
  editing = {};
  selecting: Category;
  deleting: Category;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
    this.filteredData = this.data;
  }

  getData() {
    this.categoryService.getCategory()
      .then(
        (response: Category[]) => {
          this.data = response;
          this.filteredData = response;
        }
      );
  }

  openUpdateModal(category: any) {
    this.modalRef = this.modalService.show(EditCategoryComponent, { initialState: { category }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
  }

  updateFilter(event: any) {
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

  onSelect({ selected }: any) {
    if (selected) {
      // selected is an array
      selected = selected[0];
      if (selected !== this.selecting) {
        this.selecting = selected;
      }
    }
  }

  deleteCategory(category: any) {
    this.deleting = category;
    this.categoryService.deleteCategory(category)
      .then(() => {
        this.getData();
        this.selecting = null;
      })
      .catch((error) => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

  selectCheck(event) {
    return event !== this.deleting;
  }

}
