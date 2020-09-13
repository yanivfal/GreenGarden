import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartItem} from '../../models/cart-item';
import {HttpClient} from '@angular/common/http';
import {cartUrl} from '../../../config/api';
import {map, tap} from 'rxjs/operators';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartStore{
  private subject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.subject.asObservable();
  cartCount$: Observable<number>;
  cartTotal$: Observable<number>;

  constructor(private http: HttpClient) {
    this.cartCount$ = this.cartItems$.pipe(map(cartItems => cartItems.length));
    this.cartTotal$ = this.cartItems$.pipe(map(cartItems => this.getCartTotal(cartItems)));
  }

  init() {
    this.http.get<CartItem[]>(cartUrl, {withCredentials: true}).pipe(
      tap(() => console.log('Http reques executed')),
    ).subscribe(
      items => this.subject.next(items)
    );
  }

  addToCart(product: Product, qty: number) {
    const cartItems = this.subject.getValue();

    const itemIndex = cartItems.findIndex(item => item.product._id === product._id);

    // check if item already exists
    if (itemIndex === -1) {
      const newItem = new CartItem(product, qty);
      cartItems.push(newItem);
    }
    else {
      cartItems[itemIndex].qty = cartItems[itemIndex].qty + qty;
    }

    const newCart = cartItems.slice(0);

    this.subject.next(newCart);

    return this.doPutRequest(newCart);
  }

  updateCart(updatedItem: CartItem): Observable<any> {
    const newCartItems = this.updateAndCreateNewCart(updatedItem);
    this.subject.next(newCartItems);

    return this.doPutRequest(newCartItems);
  }

   private updateAndCreateNewCart(updatedItem: CartItem) {
    const cartItems = this.subject.getValue();

    const itemIndex = cartItems.findIndex(item => item.product._id === updatedItem.product._id);

    const newCart = cartItems.slice(0);

    newCart[itemIndex] = {
      ...cartItems[itemIndex],
      ...updatedItem
    };

    return newCart;
  }

  deleteItemFromCart(itemToDelete: CartItem): Observable<any> {
    const newCartItems = this.deleteAndCreateNewCart(itemToDelete);
    this.subject.next(newCartItems);

    return this.http.delete<CartItem[]>(`${cartUrl}/${itemToDelete.product._id}`);
  }

  private deleteAndCreateNewCart(itemToDelete: CartItem) {
    const cartItems = this.subject.getValue();

    const newCart = cartItems.filter(item => !(item.product._id === itemToDelete.product._id));

    return newCart;
  }

  private convertItemToIdOnly(item): any{
    return {product: item.product._id, qty: item.qty};
  }

  private doPutRequest(newCartItems: CartItem[]) {
    return this.http.put<CartItem[]>(cartUrl, {items: newCartItems.map(item => this.convertItemToIdOnly(item))});
  }

  getCartTotal(cartItems: CartItem []) {
    let total = 0;

    for (const item of cartItems) {
      total = total + item.qty * item.product.price;
    }

    return total;
  }

  getNumberOfItemsInCart() {
    const cartItems = this.subject.getValue();

    return cartItems ? cartItems.length : 0;
  }

  getCurrentCart() {
    return this.subject.getValue();
  }
}
