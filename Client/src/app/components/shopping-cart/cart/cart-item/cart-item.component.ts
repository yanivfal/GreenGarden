import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../../../models/cart-item';
import {MessengerService} from '../../../../services/messenger.service';
import {CartStore} from '../../../../services/stores/cart-store';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;

  constructor(private msg: MessengerService, private cartStore: CartStore) { }

  ngOnInit(): void {
  }

  remove() {
    this.cartStore.deleteItemFromCart(this.cartItem).subscribe(() => console.log('item deleted'));
  }

  updateCartItem(){
    this.cartStore.updateCart(this.cartItem).subscribe(() => console.log('cart updated'));
  }

  increaseQty() {
    this.cartItem.qty++;
    this.updateCartItem();
  }

  decreaseQty() {
    this.cartItem.qty--;
    this.updateCartItem();
  }
}
