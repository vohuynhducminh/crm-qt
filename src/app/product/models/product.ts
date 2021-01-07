export class Product {
  Id: string;
  Name: string;
}

export class ProductCM {
  Name: string;
}

export class Category {
  Id: string;
  Name: string;
}

export class CategoryCM {
  CategoryIds: string[];
  ProductId: string;
}
