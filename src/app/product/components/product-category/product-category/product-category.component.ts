import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Product, Category } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input()
  set product(product: Product) {
    this._product = product;
    if (product) {
      if (this._categoryList) {
        this.getData();
      } else {
        this.getCategoryList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  _product: Product;
  _categoryList: Category[];
  data: Category[] = [];
  filteredData: Category[] = [];
  modalRef: BsModalRef;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
    ) { }

  getCategoryList() {
    this.categoryService.getCategory()
      .then((response: Category[]) => {
        this._categoryList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  getData() {
    this.productService.getCategories(this._product.Id)
      .then((response: Category[]) => {
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

  deleteProductCategory(category: Category) {
    this.productService.deleteCategory(category.Id, this._product.Id)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
