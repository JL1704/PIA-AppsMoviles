import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';//
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';//
import { Game } from './game.model';
import firebase from 'firebase/compat/app';//
import { combineLatest, Observable  } from 'rxjs';
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
      map((games: Game[]) => {
        return games.reduce((total, game) => total + (game.finalprice || 0), 0);
      })
    );
  }

  async transferCartToLibrary(uid: string, cartItems: Game[]) {
    try {
      const libraryRef = this.firestore.collection('library').doc(uid);
      const existingData = await libraryRef.get().toPromise();
      let existingCart: { [key: string]: any } = {}; // Definimos el tipo de existingCart como un objeto con índices de tipo string y valores de cualquier tipo
      
      if (existingData && existingData.exists) {
        existingCart = (existingData.data() as { Cart?: { [key: string]: any } }).Cart || {};
      }
  
      const newCart: { [key: string]: any } = cartItems.reduce((acc: { [key: string]: any }, item) => { // Define explícitamente el tipo de acc como un objeto con índices de tipo string y valores de cualquier tipo
        acc[item.title] = this.firestore.collection('AllGames').doc(item.title).ref;
        return acc;
      }, {});
  
      // Merge existing cart with new cart
      const mergedCart = { ...existingCart, ...newCart };
  
      // Transfer the merged cart to the "library" collection
      await libraryRef.set({ Cart: mergedCart }, { merge: true });
    } catch (error) {
      throw error;
    }
  }
    
  async clearCart(uid: string) {
    try {
      const cartRef = this.firestore.collection('ShoppingCart').doc(uid);
      await cartRef.delete();
    } catch (error) {
      throw error;
    }
  }
  
  
}