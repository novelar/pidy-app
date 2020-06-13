import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  cart_num: number;

  constructor(
    private cartService: CartService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.cartService.cartListSubject
      .subscribe(res => {
        this.cart_num = res.length;
      })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
