/*import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private selectedGameSubject = new BehaviorSubject<Game | null>(null);
  selectedGame$ = this.selectedGameSubject.asObservable();

  // Simular una lista de juegos en venta
  private gamesOnSale: Game[] = [
    {
      title: 'Juego 1',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 1',
      price: 19.99,
      finalprice: 13.99,
      description: '',
      discount: 30
    },
    {
      title: 'Juego 2',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 2',
      price: 24.99,
      finalprice: 22.49,
      description: '',
      discount: 10
    },
    // Agregar más juegos según sea necesario
  ];

  // Simular una lista de todos los juegos
  private allGames: Game[] = [
    {
      title: 'Juego 1',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 1',
      price: 29.99,
      finalprice: 29.99,
      description: '',
      discount: 0
    },
    {
      title: 'Juego 2',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 2',
      price: 34.99,
      finalprice: 34.99,
      description: '',
      discount: 0
    },
    // Agregar más juegos según sea necesario
  ];

  constructor() { }

  // Método para obtener los juegos en venta
  getGamesOnSale(): Game[] {
    return this.gamesOnSale;
  }

  // Método para obtener todos los juegos
  getAllGames(): Game[] {
    return this.allGames;
  }

  setSelectedGame(game: Game) {
    this.selectedGameSubject.next(game);
  }

  getSelectedGame(): Game | null {
    return this.selectedGameSubject.getValue();
  }
}
*/
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
