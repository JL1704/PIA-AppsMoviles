import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { GameDataService } from '../game-data.service';
import { Game } from '../game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-on-sale',
  templateUrl: './games-on-sale.component.html',
  styleUrls: ['./games-on-sale.component.scss'],
})
export class GamesOnSaleComponent implements OnInit, OnDestroy {

  items: Game[] = [];
  gamesOnSaleSubscription: Subscription | undefined; // Inicializa la propiedad con undefined

  constructor(private modalController: ModalController, private gameDataService: GameDataService) {}

  ngOnInit() {
    // Obtener los juegos en venta del servicio al inicializar el componente
    this.gamesOnSaleSubscription = this.gameDataService.getGamesOnSale().subscribe((gamesOnSale: Game[]) => {
      this.items = gamesOnSale;
    });
  }

  ngOnDestroy() {
    // Liberar la suscripción cuando el componente es destruido para evitar fugas de memoria
    if (this.gamesOnSaleSubscription) {
      this.gamesOnSaleSubscription.unsubscribe();
    }
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
