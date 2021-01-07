import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/product/models/product';
import { Category } from 'src/app/category/models/category';
import { CategoryService } from 'src/app/category/services/category.service';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrls: ['./create-product-category.component.scss'],
})
export class CreateProductCategoryComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input() product: Product;
  @Input()
  set addedCategoryList(addedCategoryList: Category[]) {
    if (addedCategoryList) {
      this._addedCategoryList = [...addedCategoryList];
      if (!this._categoryList) {
        this.getCategoryList(() => {
          this.filterCategory();
        });
      } else {
        this.filterCategory();
      }
    }
  }

  _addedCategoryList: Category[];
  _categoryList: Category[];
  _filteredCategoryList: Category[];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCategoryList();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
  }

  getCategoryList(cb?: Function) {
    this.categoryService.getCategory()
      .then((response: Category[]) => {
        this._categoryList = response;
        if (cb) { cb(); }
      });
  }

  filterCategory() {
    this._filteredCategoryList = this._categoryList.filter(
      p => !this._addedCategoryList.find(ap => ap.Id === p.Id)
    );
  }

  createProductCategory(categoryIds: string[]) {
    this.productService.addCategory(this.product.Id, categoryIds)
      .then(
        () => {
          this.modalService.hide(1);
          this.refresh.emit();
        }
      );
  }

}
