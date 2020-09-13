import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../../../services/purchase.service';
import {Purchase} from '../../../models/purchase';
import {CartItem} from '../../../models/cart-item';

@Component({
  selector: 'app-purchases-history',
  templateUrl: './purchases-history.component.html',
  styleUrls: ['./purchases-history.component.css']
})
export class PurchasesHistoryComponent implements OnInit {
  lastPurchases: Purchase [];

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.loadPurchases().subscribe((result) => {
      this.lastPurchases = result.reverse();
    });
  }

  getTotal(items: CartItem[]) {
    let total = 0;
    for (const item of items) {
      total = total + item.qty * item.product.price
    }
    return total;
  }

}
