import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import {AppRoutingModule} from './app-routing.module';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckOutComponent } from './components/shopping-cart/check-out/check-out.component';
import { CartSummaryComponent } from './components/shopping-cart/check-out/cart-summary/cart-summary.component';
import { CheckoutFormComponent } from './components/shopping-cart/check-out/checkout-form/checkout-form.component';
import {FilterProductByCategory} from './services/pipes/filter-product-by-category';
import { AdminComponent } from './components/admin/admin.component';
import {TokenInterceptor} from './services/Interceptors/tokenInterceptor';
import { ThankYouComponent } from './components/shopping-cart/check-out/thank-you/thank-you.component';
import { AddProductFormComponent } from './components/admin/add-product-form/add-product-form.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { UserActivityComponent } from './components/admin/user-activity/user-activity.component';
import { PurchasesHistoryComponent } from './components/admin/purchases-history/purchases-history.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/shared/messages/messages.component';
import {CookieService} from 'ngx-cookie-service';
import { ReadmeComponent } from './components/readme/readme.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    CheckOutComponent,
    CartSummaryComponent,
    CheckoutFormComponent,
    FilterProductByCategory,
    AdminComponent,
    ThankYouComponent,
    AddProductFormComponent,
    DragAndDropDirective,
    UserActivityComponent,
    PurchasesHistoryComponent,
    HomeComponent,
    MessagesComponent,
    ReadmeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
