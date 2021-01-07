import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Product, Category } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-create-category-product',
  templateUrl: './create-category-product.component.html',
  styleUrls: ['./create-category-product.component.scss'],
})

export class CreateCategoryProductComponent implements OnInit {

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() category: Category;
  @Input()
  set addedProductList(addedProductList: Product[]) {
    if (addedProductList) {
      this._addedProductList = [...addedProductList];
      if (!this._productList) {
        this.getProductList(() => {
          this.filterProduct();
        });
      } else {
        this.filterProduct();
      }
    }
  }

  _addedProductList: Product[];
  _productList: Product[];
  _filteredProductList: Product[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductList();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  getProductList(cb?: Function) {
    this.productService.getProducts()
      .then((response: Product[]) => {
        this._productList = response;
        if (cb) { cb(); }
      });
  }

  filterProduct() {
    this._filteredProductList = this._productList.filter(
      p => !this._addedProductList.find(ap => ap.Id === p.Id)
    );
  }

  createCategoryProduct(productIds: string[]) {
    this.categoryService.addProduct(this.category.Id, productIds)
      .then(
        () => {
          this.modalService.hide(1);
          this.refresh.emit();
        }
      );
  }

}
