import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';
import { cartUrl } from '../../config/api';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsCount: number;
  cartItems: CartItem[] = [];

  constructor(private http: HttpClient) { }

  loadCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((result) => {
          return result;
      })
    );
  }

  addProductToCart(product: Product, quantity: number): Observable<any> {
      const qty = 1;
      return this.http.post(cartUrl, { product, qty });
  }

  // updateCartItem(item: CartItem): Observable<any> {
  //   return this.http.put(cartUrl + '/' + item.id, item);
  // }

  getItemCount(): number {
    return this.cartItemsCount;
  }

  deleteItem(ProductID: number): Observable<any> {
    return this.http.delete(cartUrl + '/' + ProductID);
  }
}
