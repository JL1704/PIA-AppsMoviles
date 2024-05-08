import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { GameDataService } from '../game-data.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-games-on-sale',
  templateUrl: './games-on-sale.component.html',
  styleUrls: ['./games-on-sale.component.scss'],
})
export class GamesOnSaleComponent implements OnInit {

  items: Game[] = []; // Declarar la propiedad 'items'

  constructor(private modalController: ModalController, private gameDataService: GameDataService) {}

  async ngOnInit() {
    // Obtener los juegos en venta del servicio al inicializar el componente
    this.items = await this.gameDataService.getGamesOnSale();
  }

  async openModal(item: Game) {
    const modal = await this.modalController.create({
      component: GameModalComponent,
      componentProps: {
        selectedGame: item
      }
    });
    return await modal.present();
  }

}
