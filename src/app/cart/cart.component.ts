import { Component } from '@angular/core';
import { CartBaseComponent } from "./cart-base.component";
import { CartService } from './cart.service';
import { clientMock } from '../common/products/products.mock'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  styleUrls: ["cart.component.scss"],
  templateUrl: 'cart.component.html'
})
export class CartComponent extends CartBaseComponent {
  clientForm;
  client = clientMock;
  isDelivery = 0;
  nameError = false;
  addressError = false;

  constructor(
    protected cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router) {
    super(cartService);
    this.clientForm = this.formBuilder.group({
      name: [''],
      address: [''],
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
    this.clientForm.patchValue({
      address: ''
    });

    this.addressError = false;
  }

  sendOrder = (customerData) => {
    this.nameError = false;
    this.addressError = false;
    if (this.clientForm.controls.name.value.length < 4) {
      this.nameError = true;
    }

    if (this.isDelivery == 1 && this.clientForm.controls.address.value.length < 4) {
      this.addressError = true;
    }

    if (this.addressError || this.nameError) {
      return;
    }

    var whatsappUrl = "https://wa.me/549" + this.client.phone + "?text=";
    var whatsappText = "Hola! Soy " + customerData.name + ", mi pedido es:%0a%0a";
    this.cartList.forEach((elem) => {
      whatsappText += elem.product.quantity + " x " + elem.product.name + " - $" + elem.product.price * elem.product.quantity + "%0a";
    })

    whatsappText += "*Total: $" + this.totalPrice + "*";
    if (customerData.address.trim() != "") {
      whatsappText += "%0a%0aForma de entrega: *DELIVERY*%0aDirección: *" + customerData.address + "*";
    } else {
      whatsappText += "%0a%0aForma de entrega: *RETIRO POR LOCAL*.";
    }

    window.open(whatsappUrl + whatsappText, '_blank');
    this.clientForm.reset();
    this.cartService.clearCart();
    this.router.navigate(['/mystore']);
  }
}
