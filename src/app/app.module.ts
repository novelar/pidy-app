import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BackOfficeComponent } from './backoffice/backoffice.component';
import { ImageUploadComponent } from './common/image-upload/image-upload.component';
import { ImageService } from './common/image-upload/image-upload.service';
import { CartService } from './cart/cart.service';
import { ProductComponent } from './product-component/product.component';
import { SignInComponent } from './sign-in/signin.component';
import { ProductsService } from './common/products/products.service';
import { HomeComponent } from './home/home.component';
import { MyStoreComponent } from './mystore/mystore.component';
import { QuantityControlComponent } from './common/quantity-control/quantity-control.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CartComponent,
    BackOfficeComponent,
    MyStoreComponent,
    ImageUploadComponent,
    ProductComponent,
    SignInComponent,
    QuantityControlComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'backoffice', component: BackOfficeComponent },
      { path: 'mystore', component: MyStoreComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'cart', component: CartComponent }
    ])
  ],
  providers: [
    ImageService,
    CartService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
