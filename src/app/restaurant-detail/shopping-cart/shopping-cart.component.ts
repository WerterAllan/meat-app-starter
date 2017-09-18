import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';

import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({ opactity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style( {  opatity: 0, transform: 'translateX(-30px)', offset: 0 }),
        style( {  opatity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style( {  opatity: 1, transform: 'translateX(0px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-in', keyframes([
        style( {  opatity: 1, transform: 'translateX(0px)', offset: 0 }),
        style( {  opatity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style( {  opatity: 0, transform: 'translateX(30px)', offset: 1 })
      ])))

    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingCartService.items;
  }

  total(): number {
    return this.shoppingCartService.total();
  }

  clear() {
    this.shoppingCartService.clear();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

}
