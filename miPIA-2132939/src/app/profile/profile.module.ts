import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from '../auth/dashboard/dashboard.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { InfoProfileComponent } from '../info-profile/info-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, LoginComponent, DashboardComponent, SignUpComponent, InfoProfileComponent]
})
export class ProfilePageModule {}
