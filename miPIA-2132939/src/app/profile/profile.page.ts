import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnDestroy {
  isLoggedIn: boolean = false;
  private subscription: Subscription;
  isSignUpModalOpen: boolean = false;


  constructor(private authService: AuthService, private modalController: ModalController) {
    this.subscription = this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async openSignUpModal(event: Event) {
    this.isSignUpModalOpen = false;
    event.preventDefault();
    // Verifica si el modal ya está abierto antes de intentar abrir otro
    if (!this.isSignUpModalOpen) {
      this.isSignUpModalOpen = true;
      const modal = await this.modalController.create({
        component: SignUpComponent,
      });
      await modal.present();
    }
  }
  
  closeSignUpModal() {
    // Asegúrate de que la variable isSignUpModalOpen se establezca en falso al cerrar el modal
    this.isSignUpModalOpen = false;
    this.modalController.dismiss();
  }
  
}

