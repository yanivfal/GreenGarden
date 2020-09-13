import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: Product[];
  categoryFilter = 'all';
  searchData: FormGroup;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.productsList = this.route.snapshot.data['products'];
    this.searchData = new FormGroup({
      search: new FormControl(''),
    });

    this.searchData.valueChanges.subscribe(val => {
      if (val.search === '') {
        this.productsList = this.route.snapshot.data['products'];
      }
    })
  }

  changeCategoryFilter(newCategory: string){
    this.categoryFilter = newCategory;
  }

  search(productName: string) {
    this.productsList = this.productsList.filter(product => product.name.startsWith(productName));
  }
}
