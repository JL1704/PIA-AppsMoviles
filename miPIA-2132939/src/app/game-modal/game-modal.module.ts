import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { GameModalComponent } from './game-modal.component';

@NgModule({
  declarations: [GameModalComponent],
  imports: [
    CommonModule,
    IonicModule // Agrega IonicModule a los imports
  ],
})
export class GameModalModule {}
