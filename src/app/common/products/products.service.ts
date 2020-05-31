import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productsMock, categoriesMock } from './products.mock'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products = productsMock;
  productsSelectedForCategory = [];
  categories = categoriesMock;
  selectedCategory;

  constructor(
    private http: HttpClient
  ) { }

  addProduct(product) {
    product.id = this.products.length + 1;
    product.category = this.selectedCategory.name;
    console.warn('Your product has been submitted', product);
    this.products.push(product);
  }

  addCategory(category) {
    category.id = this.categories.length + 1;
    this.categories.push(category);
  }

  selectCategory(category) {
    console.log("category selected: " + category.name);
    this.selectedCategory = category;
    return this.selectedCategory;
  }

  getItems() {
    this.productsSelectedForCategory = this.products.filter(x => x.category == this.selectedCategory.name);
    return this.productsSelectedForCategory;
  }

  getCategories() {
    return this.categories;
  }

  deleteProduct(product) {
    this.products = this.products.filter(x => x.name != product.name);
    return this.getItems();
  }

  updateProduct(product) {
    this.products = [];
    return this.products;
  }
}
