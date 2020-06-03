import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private REST_API_SERVER = 'http://localhost:3000';
  private REST_API_SERVER = 'https://pidy-api.herokuapp.com';

  public cartListSubject = new BehaviorSubject([]);
  public toggleCartSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient
  ) { }

  public sendGetRequest(): any {
    return this.httpClient.get(this.REST_API_SERVER + '/api/categories');
  }

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
    let current = this.cartListSubject.getValue();
    current.forEach(x => x.product.quantity = 0);
    this.cartListSubject.next(current);
    this.cartListSubject.next([]);
  }
}
