import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('email') emailInput!: IonInput;
  @ViewChild('password') passwordInput!: IonInput;

  constructor(private authService: AuthService, private modalController: ModalController) {}

  signUp(event: Event) {
    event.preventDefault();
    const email = this.emailInput.value as string;
    const password = this.passwordInput.value as string;

    if (email && password) {
      this.authService.signUpWithEmailAndPassword(email, password);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
