import {Component, OnInit} from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {Product} from '../../../models/product';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../models/cart-item';
import {Observable} from 'rxjs';
import {CartStore} from '../../../services/stores/cart-store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartTotal = 0;

  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private msg: MessengerService,
              private cartStore: CartStore) {
    this.cartTotal$ = this.cartStore.cartTotal$;
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartStore.cartItems$;
  }

  isCartEmpty(){
    return false;
  }

  // getCartTotal() {
  //   return this.cartStore.getCartTotal();
  // }
}
