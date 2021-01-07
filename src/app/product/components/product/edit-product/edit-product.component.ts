import { Component, OnInit, EventEmitter } from '@angular/core';
import { Product } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: Product;
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product = { ...this.product };
  }

  updateProduct() {
    this.productService.updateProduct(this.product)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }
}
