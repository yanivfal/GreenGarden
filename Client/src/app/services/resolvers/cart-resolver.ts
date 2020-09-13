import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CartService} from '../cart.service';

@Injectable()
export class CartResolver implements Resolve<any> {

  constructor(private cartService: CartService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.cartService.loadCartItems();
  }
}
