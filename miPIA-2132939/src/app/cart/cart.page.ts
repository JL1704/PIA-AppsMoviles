import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MetodoPagoComponent } from '../metodo-pago/metodo-pago.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openMetodoPagoModal() {
    const modal = await this.modalController.create({
      component: MetodoPagoComponent,
      componentProps: { }
    });
    return await modal.present();
  }

}

