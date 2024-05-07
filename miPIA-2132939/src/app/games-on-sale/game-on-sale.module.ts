import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GamesOnSaleComponent } from './games-on-sale.component';

@NgModule({
  declarations: [
    GamesOnSaleComponent
  ],
  imports: [
    CommonModule,
    IonicModule // Asegúrate de importar IonicModule aquí
  ],
  exports: [
    GamesOnSaleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesOnSaleModule { }
