import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductComponent } from './components/product/product/product.component';
import { ProductCategoryComponent } from './components/product-category/product-category/product-category.component';
import { CreateProductCategoryComponent } from './components/product-category/create-product-category/create-product-category.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductComponent,
    ProductCategoryComponent,
    CreateProductCategoryComponent,
    CreateProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRevoxModule,
    ProductRoutingModule,
  ],
  entryComponents: [
    EditProductComponent,
  ],
})
export class ProductModule { }
