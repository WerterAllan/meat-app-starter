import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { OrderItem } from './order.model';

import { PATTERNS } from '../shared/patterns';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  delivery = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Refeição', value: 'REF' }
  ];

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailIsNotMatch: true };
    }

    return undefined;
  }

  constructor(
    private orderService: OrderService,
    private route: Router,
    private formFbuilder: FormBuilder) { }


  ngOnInit() {

    this.orderForm = this.formFbuilder.group({

      name: this.formFbuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formFbuilder.control('', [Validators.required, Validators.pattern(PATTERNS.email)]),
      emailConfirmation: this.formFbuilder.control('', [Validators.required, Validators.pattern(PATTERNS.email)]),
      address: this.formFbuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formFbuilder.control('', [Validators.required, Validators.pattern(PATTERNS.number)]),
      optionalAddress: this.formFbuilder.control(''),
      paymentOption: this.formFbuilder.control('', [Validators.required])
      // TODO: Pesquisar como o angular injeta esse propriedade
    }, { validator: OrderComponent.equalsTo });
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
