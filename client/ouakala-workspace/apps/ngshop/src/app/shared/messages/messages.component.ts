import { Component, OnInit } from '@angular/core';
import { CartService } from '@ouakala-workspace/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private _cartService: CartService, private _messageService: MessageService) { }

  ngOnInit(): void {
    this._cartService.cart$.subscribe(() => {
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart has been Updated!'
      });
    });
  }

}
