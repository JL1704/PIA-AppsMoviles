import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../game.model';
import { CartService } from '../cart.service'; // Asegúrate de importar tu servicio de carrito si lo tienes

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {

  @Input() selectedGame: Game | null = null;

  constructor(private modalController: ModalController, private cartService: CartService) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  addToCart() {
    if (this.selectedGame) {
      this.cartService.addToCart(this.selectedGame);
      this.dismissModal(); // Opcional: cerrar el modal después de agregar al carrito
    }
  }

}
