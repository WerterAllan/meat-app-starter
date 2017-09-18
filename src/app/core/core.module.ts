import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';



@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [ShoppingCartService, RestaurantsService, OrderService],
})
export class CoreModule {}
