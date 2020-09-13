import { Component, OnInit } from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message$: Observable<string>;
  constructor(private messageService: MessengerService) { }

  ngOnInit(): void {
    this.message$ = this.messageService.message$;
  }

  clear() {
    this.messageService.clearMessage();
  }
}
