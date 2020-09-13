import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../product.service';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.productService.loadProducts();
  }
}
