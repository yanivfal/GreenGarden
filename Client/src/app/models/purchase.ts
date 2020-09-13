import {Address} from './address';
import {User} from './user';
import {CartItem} from './cart-item';

export class Purchase {
  personal: User;
  address: Address;
  items: CartItem [];

  constructor(user: User, address: Address, items: CartItem []) {
    this.personal = user;
    this.address = address;
    this.items = items;
  }
}
