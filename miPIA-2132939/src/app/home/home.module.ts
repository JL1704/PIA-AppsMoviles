import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesOnSaleModule } from '../games-on-sale/game-on-sale.module';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { GamesListComponent } from '../games-list/games-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesOnSaleModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, GamesListComponent]
})
export class HomePageModule {}
