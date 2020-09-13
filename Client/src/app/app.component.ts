import {Component, OnInit} from '@angular/core';
import {CartStore} from './services/stores/cart-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private cartStore: CartStore) {
  }
  title = 'shopping-cart';

  ngOnInit(): void {
   this.cartStore.init();
  }
}
