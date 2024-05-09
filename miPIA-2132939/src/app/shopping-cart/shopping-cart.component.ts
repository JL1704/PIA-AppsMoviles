import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Game[] = [];
  total: number = 0;
  selectedGame: Game | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateCart();
    this.updateTotal();
  }

  updateCart() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  updateTotal() {
    const totalBeforeRounding = this.cartService.getTotal();
    this.total = parseFloat(totalBeforeRounding.toFixed(2));
  }
  

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  isInCart(game: Game): boolean {
    return this.cartItems.some(item => item.title === game.title);
  }
}


