import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './game.model';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa el servicio AngularFirestore
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private selectedGameSubject = new BehaviorSubject<Game | null>(null);
  selectedGame$ = this.selectedGameSubject.asObservable();

  getGamesOnSale(): Observable<Game[]> {
    return this.firestore.collection<Game>('gamesOnSale').valueChanges();
  }

  constructor(private firestore: AngularFirestore) {} // Inyecta AngularFirestore

  async getAllGamesFromFirestore(): Promise<Game[]> {
    try {
      const gamesListSnapshot = await this.firestore.collection('GamesList').get().toPromise();
      if (gamesListSnapshot) { // Verificar si gamesListSnapshot es definido
        return gamesListSnapshot.docs.map(doc => {
          const gameData = doc.data() as Game;
          return {
            title: gameData.title,
            imageUrl: gameData.imageUrl,
            category: gameData.category,
            price: gameData.price,
            finalprice: gameData.finalprice,
            description: gameData.description,
            discount: gameData.discount
          };
        });
      } else {
        console.error("No se encontraron juegos.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      return [];
    }
  }
  

  setSelectedGame(game: Game) {
    this.selectedGameSubject.next(game);
  }

  getSelectedGame(): Game | null {
    return this.selectedGameSubject.getValue();
  }

}

