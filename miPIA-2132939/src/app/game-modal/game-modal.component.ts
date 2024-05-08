import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../game.model';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {

  @Input() selectedGame: Game | null = null;

  constructor(private modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss();
  }

}








