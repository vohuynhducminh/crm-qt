import { Component, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { ProductCM } from 'src/app/product/models/product';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;
  isCreating: boolean;
  formGroup: FormGroup;
  name: string;
  description: string;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
    this.isCreating = false;
  }

  createProduct(name: string) {
    this.isCreating = true;
    const productCM: ProductCM = {
      Name: name,
    };
    this.productService.createProduct(productCM)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
        this.isCreating = false;
      })
      .catch(error => console.error(error));
  }

}
