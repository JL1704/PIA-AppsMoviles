/*import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Game } from '../game.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Game[] = [];
  total: number = 0;
  selectedGame: Game | null = null;


  constructor(private cartService: CartService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => { // Escucha cambios en el estado de autenticación
      if (user) {
        const uid = user.uid; // Obtiene el UID del usuario autenticado
        this.cartService.getCartItems(uid).subscribe((items: any[]) => {
          this.cartItems = items;
        });
      }
    });
  }

/*
  ngOnInit() {
    this.updateCart();
    this.updateTotal();
  }

  updateCart() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
     // this.updateTotal();
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
}*/

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

  constructor(private cartService: CartService, private afAuth: AngularFireAuth) { 

  
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => { // Escucha cambios en el estado de autenticación
      if (user) {
        const uid = user.uid; // Obtiene el UID del usuario autenticado
        this.cartService.getCartItems(uid).subscribe((items: any[]) => {
          this.cartItems = items;
          this.updateTotal(); // Actualiza el total del carrito al obtener los elementos del carrito
        });
      }
    });
    
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index); // Llama a la función para eliminar el juego del carrito
  }


  updateTotal() {
    this.total = this.cartItems.reduce((total, item) => total + (item.finalprice || 0), 0);
    this.total$ = of(this.total); // Convierte el número en un observable utilizando 'of' de RxJS
  }
  

  isInCart(game: Game): boolean {
    return this.cartItems.some(item => item.title === game.title);
  }

}
