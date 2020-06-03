import { Component } from '@angular/core';
import { CartBaseComponent } from './cart-base.component';
import { CartService } from './cart.service';
import { clientMock } from '../common/products/products.mock'
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  styleUrls: ['cart.component.scss'],
  templateUrl: 'cart.component.html'
})
export class CartComponent extends CartBaseComponent {
  checkoutForm;
  client = clientMock;
  isDelivery = 0;

  constructor(
    protected cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router) {
    super(cartService);
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.cartService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
    })
  }

  changeQuantity = (cart, quantity) => {
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  }

  plusOne = (product) => {
    if (product.quantity < 100) {
      product.quantity++;
      this.loadCart();
    }
  }

  minusOne = (product) => {
    product.quantity--;
    if (product.quantity == 0) {
      this.removeFromCart(product);
    }
    this.loadCart();
  }

  deleteAddress = () => {
    this.checkoutForm.patchValue({
      address: ''
    });
  }

  sendOrder = (customerData) => {
    var whatsappUrl = "https://wa.me/549" + this.client.phone + "?text=";
    var whatsappText = "Hola! Soy " + customerData.name + ", mi pedido es:%0a%0a";
    this.cartList.forEach((elem) => {
      whatsappText += elem.product.quantity + " x " + elem.product.name + " - $" + elem.product.price * elem.product.quantity + "%0a";
    })
    whatsappText += "*Total: $" + this.totalPrice + "*";
    if (customerData.address != "") {
      whatsappText += "%0a%0aForma de entrega: *DELIVERY*%0aDirección: *" + customerData.address + "*";
    } else {
      whatsappText += "%0a%0aForma de entrega: *RETIRO POR LOCAL*.";
    }
    console.log(whatsappUrl + whatsappText);
    window.open(whatsappUrl + whatsappText, '_blank');
    this.checkoutForm.reset();
    this.cartService.clearCart();
    this.router.navigate(['/mystore']);
  }
}
