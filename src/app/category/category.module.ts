import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CategoryComponent } from './components/category/category/category.component';
import { CategoryProductComponent } from './components/category-product/category-product/category-product.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { CreateCategoryProductComponent } from './components/category-product/create-category-product/create-category-product.component';
import { PagesRevoxModule } from '../@pages/pages-revox.module';
import { FormsModule } from '@angular/forms';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';

@NgModule({
  declarations: [
    CategoryPageComponent,
    CategoryComponent,
    CategoryProductComponent,
    CreateCategoryComponent,
    CreateCategoryProductComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRevoxModule,
    CategoryRoutingModule,
  ],
  entryComponents: [
    EditCategoryComponent,
  ],
})
export class CategoryModule { }
