import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CartItem} from '../models/cart-item';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private subject = new BehaviorSubject<string>(null);
  message$: Observable<string> = this.subject.asObservable();

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.subject.next(null);
      }
    });
  }

  alertMessage(message: string) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next(null);
  }
}
