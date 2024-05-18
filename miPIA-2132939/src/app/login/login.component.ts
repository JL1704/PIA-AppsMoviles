import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public auth: AuthService, private router: Router) {}

  login() {
    this.auth.loginWithGoogle().then(() => {
      this.router.navigate(['/tabs/profile']);
    }).catch(error => {
      console.error('Error during login:', error);
    });
  }
}

