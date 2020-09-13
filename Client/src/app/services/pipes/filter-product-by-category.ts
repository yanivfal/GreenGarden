import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../product.service';

@Pipe({
  name: 'filterByCategory'
})
export class FilterProductByCategory implements PipeTransform{
  transform(products: Product [], category: string): Product[] {
    if (category === 'all'){
      return products;
    }
    else {
      return products.filter(product => product.categories.includes(category));
    }
  }

}
