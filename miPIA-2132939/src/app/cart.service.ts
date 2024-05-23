import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';//
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';//
import { Game } from './game.model';
import firebase from 'firebase/compat/app';//
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Game[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  addToCart(game: Game) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const gameRef = this.firestore.collection('AllGames').doc(game.title).ref;

        // Referencia al documento del carrito del usuario
        const cartRef = this.firestore.collection('ShoppingCart').doc(user.uid);

        // Actualizar el documento del carrito
        cartRef.set({
          Cart: firebase.firestore.FieldValue.arrayUnion(gameRef)
        }, { merge: true })
        .then(() => console.log('Juego agregado al carrito'))
        .catch(error => console.error('Error al agregar juego al carrito:', error));
      }
    });
  }

  getCartItems(uid: string): Observable<any[]> {
    return this.firestore.collection('ShoppingCart').doc(uid).valueChanges().pipe(
      switchMap((cart: any) => {
        const gameReferences = Object.values(cart.Cart || {});
        const gamesObservables = gameReferences.map((ref: any) => this.firestore.doc(ref.path).valueChanges());
        return combineLatest(gamesObservables);
      }),
      map(games => games.filter(game => !!game)) // Filtramos los juegos que no existen
    );
  }

  async removeFromCart(index: number) {
    try {
      const currentUser = await this.afAuth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const cartRef = this.firestore.collection('ShoppingCart').doc(uid);
  
        cartRef.get().subscribe(cartDoc => {
          if (cartDoc.exists) {
            const cartData = cartDoc.data() as { Cart?: any[] }; // Aseguramos el tipo de cartData
  
            if (cartData && cartData.Cart) {
              const gameRefToRemove = cartData.Cart[index]; // Obtener la referencia del juego a eliminar
              
              // Eliminar el campo de tipo de referencia con el índice proporcionado
              cartData.Cart.splice(index, 1); // Usamos splice para eliminar el elemento
  
              // Actualizar el documento del carrito en Firestore sin el campo eliminado
              cartRef.update({ Cart: cartData.Cart })
                .then(() => console.log('Campo eliminado del carrito en Firestore'))
                .catch(error => console.error('Error al eliminar campo del carrito en Firestore:', error));
            }
          }
        });
      }
    } catch (error) {
      console.error('Error al eliminar campo del carrito en Firestore:', error);
    }
  }
    
  
  
  clearCart() {
    this.cartItemsSubject.next([]); // Actualiza el BehaviorSubject localmente
    this.updateFirestoreCart([]); // Actualiza Firestore para limpiar el carrito
  }
  
  private updateFirestoreCart(cartItems: Game[]) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const cartRef = this.firestore.collection('ShoppingCart').doc(user.uid);
        const gameRefs = cartItems.map(item => this.firestore.collection('AllGames').doc(item.title).ref);
  
        // Actualiza el documento del carrito en Firestore
        cartRef.set({
          Cart: gameRefs
        }, { merge: true })
        .then(() => console.log('Carrito actualizado en Firestore'))
        .catch(error => console.error('Error al actualizar carrito en Firestore:', error));
      }
    });
  }
  
  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      switchMap(cartItems => {
        // Obtener el UID del usuario actual
        return this.afAuth.currentUser.then(user => {
          if (user) {
            const uid = user.uid;

            // Obtener el carrito del usuario desde Firestore
            return this.firestore.collection('ShoppingCart').doc(uid).valueChanges();
          } else {
            return [];
          }
        });
      }),
      map((cart: any) => {
        if (cart && cart.Cart) {
          // Calcular el total sumando los precios finales de los juegos en el carrito
          return cart.Cart.reduce((total: number, item: any) => total + item.finalprice, 0);
        } else {
          return 0;
        }
      })
    );
  }
}
/*
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
*/
  // Agrega otros métodos según sea necesario, como actualizar la cantidad de un elemento en el carrito, etc.*/

