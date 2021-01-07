import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductCM, Category, CategoryCM } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Promise<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.endPoint + environment.apiPaths.product.get}`
    ).toPromise();
  }

  createProduct(productCM: ProductCM): Promise<ProductCM> {
    return this.httpClient.post<ProductCM>(
      `${environment.endPoint + environment.apiPaths.product.post}`, productCM
    ).toPromise();
  }

  updateProduct(product: Product): Promise<Product> {
    return this.httpClient.put<Product>(
      `${environment.endPoint + environment.apiPaths.product.post}`, product
    ).toPromise();
  }

  deleteProduct(id: string): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint + environment.apiPaths.product.delete + id}`
    ).toPromise();
  }

  getProductById(id: string): Promise<Product> {
    return this.httpClient.get<Product>(
      `${environment.endPoint + environment.apiPaths.product.get + id}`
    ).toPromise();
  }

  getCategories(id: string): Promise<Category[]> {
    return this.httpClient.get<Category[]>(
      `${environment.endPoint + environment.apiPaths.product.get + id}/Categories`
    ).toPromise();
  }

  addCategory(productId: string, categoryIds: string[]): Promise<any> {
    const productCategory = {
      ProductId: productId,
      CategoryIds: categoryIds,
    };
    return this.httpClient.post(
      `${environment.endPoint + environment.apiPaths.product.addCategories}`, productCategory
    ).toPromise();
  }

  deleteCategory(categoryId: string, productId: string): Promise<any> {
    return this.httpClient.delete(
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
