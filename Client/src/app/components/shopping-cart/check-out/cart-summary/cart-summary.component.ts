import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart.service';
import {CartItem} from '../../../../models/cart-item';
import {Observable} from 'rxjs';
import {MessengerService} from '../../../../services/messenger.service';
import {Product} from '../../../../models/product';
import {CartStore} from '../../../../services/stores/cart-store';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartTotal$: Observable<number>;
  //cartTotal = 0;
  numOfItems = 0;
  cartItems$: Observable<CartItem []>;

  constructor(private msg: MessengerService,
              private cartStore: CartStore) {
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartStore.cartItems$;
    this.cartTotal$ = this.cartStore.cartTotal$;
    //this.calcTotal();
  }

  // calcTotal() {
  //   this.cartTotal = this.cartStore.getCartTotal();
  // }

  getNumberOfItems(){
    return this.cartStore.cartCount$;
  }
}
