import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';
import {MessengerService} from '../../../../services/messenger.service';
import {CartService} from '../../../../services/cart.service';
import {CartStore} from '../../../../services/stores/cart-store';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  productItem: Product;
  isExistInCart = false;

  quantity = 1;

  constructor(private msg: MessengerService,
              private cartService: CartService,
              private cartStore: CartStore) { }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.isExistInCart = true;
    this.cartStore.addToCart(this.productItem, this.quantity).subscribe(() => {
      console.log('product added');
    });
  }

  increaseQuantity(){
    this.quantity++;
  }

  decreaseQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
