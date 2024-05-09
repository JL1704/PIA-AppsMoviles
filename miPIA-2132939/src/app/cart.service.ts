import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Game[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(game: Game) {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, game];
    this.cartItemsSubject.next(updatedCartItems);
  }

  removeFromCart(index: number) {
    const currentCartItems = this.cartItemsSubject.getValue();
    if (index >= 0 && index < currentCartItems.length) {
      const updatedCartItems = currentCartItems.filter((item, i) => i !== index);
      this.cartItemsSubject.next(updatedCartItems);
    }
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getTotal(): number {
    const currentCartItems = this.cartItemsSubject.getValue();
    return currentCartItems.reduce((total, item) => total + item.finalprice, 0);
  }

  // Agrega otros métodos según sea necesario, como actualizar la cantidad de un elemento en el carrito, etc.
}

