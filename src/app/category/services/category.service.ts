import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/product/models/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private httpCLient: HttpClient) { }

  getCategory(): Promise<Category[]> {
    return this.httpCLient.get<Category[]>(
      `${environment.endPoint + environment.apiPaths.category.get}`
    ).toPromise();
  }

  createCategory(category: Category): Promise<any> {
    return this.httpCLient.post(
      `${environment.endPoint + environment.apiPaths.category.post}`,
      category
    ).toPromise();
  }

  updateCategory(category: Category): Promise<any> {
    return this.httpCLient.put(
      `${environment.endPoint + environment.apiPaths.category.post}`,
      category
    ).toPromise();
  }

  deleteCategory(category: Category): Promise<any> {
    return this.httpCLient.delete(
      `${environment.endPoint + environment.apiPaths.category.delete + category.Id}`
    ).toPromise();
  }

  getProducts(category: Category): Promise<Product[]> {
    return this.httpCLient.get<Product[]>(
      `${environment.endPoint + environment.apiPaths.category.getProducts + category.Id}/Products`
    ).toPromise();
  }

  addProduct(categoryId: string, productIds: string[]): Promise<any> {
    const categoryProduct = {
      CategoryId: categoryId,
      ProductIds: productIds,
    };
    return this.httpCLient.post(
      `${environment.endPoint + environment.apiPaths.category.addProducts}`,
      categoryProduct
    ).toPromise();
  }

  removeProduct(categoryId: string, productId: string): Promise<any> {
    return this.httpCLient.delete(
      `${environment.endPoint + environment.apiPaths.productCategory.delete}`,
      {
        params: {
          CategoryId: categoryId,
          ProductId: productId,
        },
      }
    ).toPromise();
  }

}
