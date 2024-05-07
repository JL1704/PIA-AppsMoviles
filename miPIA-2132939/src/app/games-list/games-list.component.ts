import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from '../game-modal/game-modal.component';

interface Game {
  imageUrl: string;
  title: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent  implements OnInit {

  games: Game[] = [
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 1', category: 'Categoría 1', price: 20 },
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 2', category: 'Categoría 2', price: 25 },
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 1', category: 'Categoría 1', price: 20 },
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 2', category: 'Categoría 2', price: 25 },
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 1', category: 'Categoría 1', price: 20 },
    { imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain', title: 'Juego 2', category: 'Categoría 2', price: 25 },
    // Agregar más juegos según sea necesario
  ];

  constructor(private modalController: ModalController) {}

  async openModal(game: Game) {
    const modal = await this.modalController.create({
      component: GameModalComponent,
      componentProps: {
        game: game
      }
    });
    return await modal.present();
  }
  ngOnInit() {}

}
