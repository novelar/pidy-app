import { Component } from '@angular/core';
import { ProductsService } from '../common/products/products.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-mystore',
  templateUrl: './mystore.component.html',
  styleUrls: ['./mystore.component.scss']
})
export class MyStoreComponent {
  categories = [];
  products = [];
  productsToDisplay = [];
  selectedCategory;
  quantity = 0;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.categories = this.productsService.getCategories();
    this.selectCategory(this.categories[0]);
  }

  selectCategory(category) {
    this.selectedCategory = this.productsService.selectCategory(category);
    this.productsToDisplay = this.productsService.getItems();
  }

  addToCart(product) {
    var quantity = ++this.quantity;
    product.quantity++;
    var newCart = { product, quantity };
    this.cartService.addToCart(newCart);
    console.log('Tu producto fué añadido al carrito!' + product.name);
  }

  plusOne = (product) => {
    this.quantity++;
    if (product.quantity < 100) {
      product.quantity++;
    }
  }

  minusOne = (product) => {
    this.quantity--;
    product.quantity--;
    if (product.quantity == 0) {
      this.cartService.removeCart(product);
    }
  
  }
}
