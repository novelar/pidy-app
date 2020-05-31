import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../common/products/products.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackOfficeComponent {
  categories = [];
  products = [];
  productsToDisplay = [];
  selectedCategory;
  categoryForm;
  productForm;
  showNewCategory = false;
  showNewProduct;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: '',
      image: ''
    });
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
    this.categories = this.productsService.getCategories();
  }

  addCategory() {
    this.showNewCategory = true;
    this.showNewProduct = false;
    this.selectedCategory = null;
    this.showNewProduct = null;
    this.productsToDisplay = [];
  }

  onSubmitCategory(categoryData) {
    this.showNewCategory = false;
    console.warn('Your category has been submitted', categoryData.name);
    this.productsService.addCategory(categoryData)
    this.selectedCategory = this.productsService.selectCategory(categoryData);
    this.categoryForm.reset();
    this.showNewProduct = true;
  }

  selectCategory(category) {
    this.showNewCategory = false;
    this.selectedCategory = this.productsService.selectCategory(category);
    this.productsToDisplay = this.productsService.getItems();
    this.showNewProduct = false;
  }

  toggleNewProduct() {
    this.showNewProduct = !this.showNewProduct;
  }

  addProduct() {
    this.showNewCategory = true;
  }

  onSubmitProduct(customerData) {
    this.productsService.addProduct(customerData);
    this.productsToDisplay = this.productsService.getItems();
    this.toggleNewProduct()
    this.productForm.reset();
  }
}
