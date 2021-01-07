import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/product/models/product';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  @ViewChild('deleteErrorSwal') private deleteErrorSwal: SwalComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  data: Product[] = [];
  filteredData: Product[] = [];
  editing = {};
  selecting: Product;
  deleting: Product;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
    this.filteredData = this.data;
  }

  getData() {
    this.productService.getProducts()
      .then((response: Product[]) => {
        this.data = response;
        this.filteredData = response;
      })
      .catch((error) => { console.error(error); });
  }

  openUpdateModal(product: Product) {
    this.modalRef = this.modalService.show(EditProductComponent, { initialState: { product }, ignoreBackdropClick: true });
    this.modalRef.content.refresh.subscribe(() => this.getData());
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

  deleteProduct(product: Product) {
    this.deleting = product;
    this.productService.deleteProduct(product.Id)
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
