import { Component, OnInit } from '@angular/core';
import {AuthStore} from '../../../services/stores/auth.store';
import {CartService} from '../../../services/cart.service';
import {CartStore} from '../../../services/stores/cart-store';
import {Router} from '@angular/router';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthStore, private cartStore: CartStore, private router: Router,
              private  messageService: MessengerService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.auth.isLoggedIn$;
  }

  getNumberOfItemsInCart(){
    return this.cartStore.getNumberOfItemsInCart();
  }

  isAdmin() {
    const userStr = localStorage.getItem('auth_data');

    if (userStr) {
      const user = JSON.parse(userStr);
      return user.isAdmin;
    }
    else {
      return false;
    }


  }

  logout() {
    this.auth.logout().subscribe(
      () => {
      },
      err => {
        this.messageService.alertMessage(err.error);
      }
    );
  }
}
