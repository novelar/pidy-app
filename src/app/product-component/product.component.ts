import { Component, Input } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../common/products/products.service';
import { Product } from '../models/product';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductComponent {
  @Input() product: Product
  @Input() editable: boolean
  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  addToCart(product) {
    this.cartService.addToCart(product);
    console.log('Tu producto fué añadido al carrito!' + product);
  }

  edit(product) {
    this.productsService.updateProduct(product);
  }

  delete(product) {
    this.productsService.deleteProduct(product);
  }
}
