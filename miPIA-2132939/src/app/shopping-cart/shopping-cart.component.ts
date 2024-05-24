import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Game } from '../game.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Game[] = [];
  total: number = 0;
  total$: Observable<number> | undefined; // Observable para el total del carrito

  constructor(private cartService: CartService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.cartService.getCartItems(uid).subscribe((items: any[]) => {
          this.cartItems = items;
          this.updateTotal();
        });
      }
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  updateTotal() {
    this.total = this.cartItems.reduce((total, item) => total + (item.finalprice || 0), 0);
    this.total$ = of(this.total);
  }

  transferToLibrary() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.cartService.transferCartToLibrary(uid, this.cartItems)
          .then(() => {
            console.log('Cart transferred to library successfully');
            // Eliminar todos los elementos del carrito después de transferirlos a la biblioteca
            this.cartService.clearCart(uid)
              .then(() => console.log('Cart cleared successfully'))
              .catch(error => console.error('Error clearing cart:', error));
          })
          .catch(error => console.error('Error transferring cart to library:', error));
      }
    });
  }


  

  isInCart(game: Game): boolean {
    return this.cartItems.some(item => item.title === game.title);
  }
}
