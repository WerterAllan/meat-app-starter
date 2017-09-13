import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

export class ShoppingCartService {
  items: CartItem[] = [];

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.items
      .find((x) => x.menuItem.id === item.id);

    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  total(): number {

    let total = this.items
      .map(x => x.value())
      .reduce((prev, value) => prev + value, 0);

    // TODO: Ver depois porque o angular esta passand por aqui 2x
    //console.log("totoal", total);

      return total;
  }

  increaseQty(item: CartItem) {
    item.quantity += 1;
  }

  decreaseQty(item: CartItem) {
    item.quantity -= 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }
}
