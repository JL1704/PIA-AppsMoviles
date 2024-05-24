import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { MetodoPagoComponent } from '../metodo-pago/metodo-pago.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [CartPage, ShoppingCartComponent, MetodoPagoComponent]
})
export class CartPageModule {}
