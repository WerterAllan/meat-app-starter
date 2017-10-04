import { OrderComponent } from './order.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

  canDeactivate(orderComponent: OrderComponent,
    activatedRouterSnapshot: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): boolean {

    if (!orderComponent.isOrderCompleted()) {

      const userCanLeave = window.confirm('Deseja desistir da compra ?');
      return userCanLeave;

    } else {
      return true;
    }


  }

}
