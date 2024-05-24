import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from './game.model';
import firebase from 'firebase/compat/app';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameLibraryService {
  private libraryItemsSubject = new BehaviorSubject<Game[]>([]);
  libraryItems$ = this.libraryItemsSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  addToLibrary(game: Game) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const gameRef = this.firestore.collection('AllGames').doc(game.title).ref;

        // Referencia al documento de la biblioteca del usuario
        const libraryRef = this.firestore.collection('library').doc(user.uid);

        // Actualizar el documento de la biblioteca
        libraryRef.set({
          Cart: firebase.firestore.FieldValue.arrayUnion(gameRef)
        }, { merge: true })
        .then(() => console.log('Juego agregado a la biblioteca'))
        .catch(error => console.error('Error al agregar juego a la biblioteca:', error));
      }
    });
  }

  getLibraryItems(uid: string): Observable<any[]> {
    return this.firestore.collection('library').doc(uid).valueChanges().pipe(
      switchMap((library: any) => {
        const gameReferences = Object.values(library.Cart || {});
        const gamesObservables = gameReferences.map((ref: any) => this.firestore.doc(ref.path).valueChanges());
        return combineLatest(gamesObservables);
      }),
      map(games => games.filter(game => !!game)) // Filtramos los juegos que no existen
    );
  }

  async removeFromLibrary(index: number) {
    try {
      const currentUser = await this.afAuth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const libraryRef = this.firestore.collection('library').doc(uid);

        libraryRef.get().subscribe(libraryDoc => {
          if (libraryDoc.exists) {
            const libraryData = libraryDoc.data() as { Cart?: any[] }; // Aseguramos el tipo de libraryData

            if (libraryData && libraryData.Cart) {
              const gameRefToRemove = libraryData.Cart[index]; // Obtener la referencia del juego a eliminar

              // Eliminar el campo de tipo de referencia con el índice proporcionado
              libraryData.Cart.splice(index, 1); // Usamos splice para eliminar el elemento

              // Actualizar el documento de la biblioteca en Firestore sin el campo eliminado
              libraryRef.update({ Cart: libraryData.Cart })
                .then(() => console.log('Campo eliminado de la biblioteca en Firestore'))
                .catch(error => console.error('Error al eliminar campo de la biblioteca en Firestore:', error));
            }
          }
        });
      }
    } catch (error) {
      console.error('Error al eliminar campo de la biblioteca en Firestore:', error);
    }
  }

  async clearLibrary(uid: string) {
    try {
      const libraryRef = this.firestore.collection('library').doc(uid);
      await libraryRef.delete();
    } catch (error) {
      throw error;
    }
  }
}
