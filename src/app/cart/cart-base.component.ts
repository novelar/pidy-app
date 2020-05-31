import { CartService } from "./cart.service";
import { Cart } from "../models/cart";

export class CartBaseComponent {
  public cartList: Cart[];
  public totalPrice: number;
  constructor(protected cartService: CartService) {
    this.loadCart();
  }

  loadCart = () => {
    this.cartService.cartListSubject
      .subscribe(res => {
        this.cartList = res;
        let total = 0;
        for (let cart of this.cartList) {
          total += cart.product.price * cart.product.quantity;
        }
        this.totalPrice = total;
      })
  };

  removeFromCart = product => {
    product.quantity = 0;
    this.cartService.removeCart(product);
  };
}
