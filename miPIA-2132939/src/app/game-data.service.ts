import { Injectable } from '@angular/core';
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
      price: 19.99
    },
    {
      title: 'Juego 2',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 2',
      price: 24.99
    },
    // Agregar más juegos según sea necesario
  ];

  // Simular una lista de todos los juegos
  private allGames: Game[] = [
    {
      title: 'Juego 1',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 1',
      price: 29.99
    },
    {
      title: 'Juego 2',
      imageUrl: 'https://th.bing.com/th/id/R.197e9fb01725220408b2cfd56c66cea4?rik=NjsyFC%2fCSLHBtA&pid=ImgRaw&r=0',
      category: 'Categoría del Juego 2',
      price: 34.99
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
