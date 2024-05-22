import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { GameDataService } from '../game-data.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {

  games: Game[] = [];

  constructor(private modalController: ModalController, private gameDataService: GameDataService) {}

  async ngOnInit() {
    try {
      // Obtener todos los juegos de la colección "GamesList"
      this.games = await this.gameDataService.getAllGamesFromFirestore();
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
    }
  }

  async openModal(game: Game) {
    const modal = await this.modalController.create({
      component: GameModalComponent,
      componentProps: {
        selectedGame: game // Pasar el juego seleccionado como un input al modal
      }
    });
    return await modal.present();
  }
}

