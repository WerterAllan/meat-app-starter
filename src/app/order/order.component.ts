import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  constructor(private orderService: OrderService, private route: Router) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseItem(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseItem(item: CartItem) {
    return this.orderService.decreaseItem(item);
  }

  removeItem(item: CartItem) {
    this.orderService.removeItem(item);
  }

  checkOrder(order: any) {

    order.orderItems = this.cartItems()
      .map((item: CartItem) =>
        new OrderItem(item.quantity, item.menuItem.id));

    console.log(order);

    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.orderService.clear();
        this.route.navigate(['/order-sumary']);
      });

  }

}
