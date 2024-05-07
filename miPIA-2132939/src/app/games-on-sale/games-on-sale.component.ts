import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameModalComponent } from '../game-modal/game-modal.component';

interface GameItem {
  imageUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-games-on-sale',
  templateUrl: './games-on-sale.component.html',
  styleUrls: ['./games-on-sale.component.scss'],
})
export class GamesOnSaleComponent  implements OnInit {

  items: GameItem[] = [
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 1',
      description: 'Descripción 1'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.GX6fsBclIgQIss_VbGbOpAHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 2',
      description: 'Descripción 2'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 1',
      description: 'Descripción 1'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.GX6fsBclIgQIss_VbGbOpAHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 2',
      description: 'Descripción 2'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 1',
      description: 'Descripción 1'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.GX6fsBclIgQIss_VbGbOpAHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 2',
      description: 'Descripción 2'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.1x02zcfSbYUSdGbldxDzhQHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 1',
      description: 'Descripción 1'
    },
    {
      imageUrl: 'https://th.bing.com/th/id/OIP.GX6fsBclIgQIss_VbGbOpAHaEK?rs=1&pid=ImgDetMain',
      title: 'Título 2',
      description: 'Descripción 2'
    },
    // Agrega más elementos según sea necesario
  ];

  constructor(private modalController: ModalController) {}

  async openModal(item: GameItem) {
    const modal = await this.modalController.create({
      component: GameModalComponent, // Reemplaza "GameModalComponent" con el nombre de tu modal
      componentProps: {
        item: item // Pasa el objeto del juego al modal
      }
    });
    return await modal.present();
  }

  ngOnInit() {}

}
