import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartListSubject = new BehaviorSubject([]);
  public toggleCartSubject = new BehaviorSubject(false);

  toggleCart = () => {
    this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  }

  addToCart = (cart: Cart) => {
    let current = this.cartListSubject.getValue();
    let dup = current.find(c => c.product.name === cart.product.name);
    if (dup) dup.quantity += cart.product.quantity;
    else current.push(cart);
    this.cartListSubject.next(current);
  };

  reloadCart = (cartList) => {
    this.cartListSubject.next(cartList);
  };

  removeCart = product => {
    let current = this.cartListSubject.getValue();
    let index = current.findIndex(x => x.product.id == product.id);
    current.splice(index, 1);
    this.cartListSubject.next(current);
  }

  clearCart = () => {
    this.cartListSubject.next([]);
  }
}
