import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap';
import { Category } from 'src/app/category/models/category';
import { Product } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss'],
})

export class CategoryProductComponent implements OnInit {

  @Input()
  set category(category: Category) {
    this._category = category;
    if (category) {
      if (this._productList) {
        this.getData();
      } else {
        this.getProductList();
      }
    } else {
      this.data = [];
      this.filteredData = [];
    }
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;

  _category: Category;
  _productList: Product[];
  data: Product[] = [];
  filteredData: Product[] = [];
  modalRef: BsModalRef;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  getProductList() {
    this.productService.getProducts()
      .then((response: Product[]) => {
        this._productList = response;
        this.getData();
      })
      .catch(error => console.error(error));
  }

  getData() {
    this.categoryService.getProducts(this._category)
      .then((response: Product[]) => {
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

  deleteCategoryProduct(product: Product) {
    this.categoryService.removeProduct(this._category.Id, product.Id)
      .then(() => this.getData())
      .catch(error => {
        this.deleteErrorSwal.show();
        console.error(error);
      });
  }

}
