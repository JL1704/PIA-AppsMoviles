import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);
  }

  async logout() {
    return await this.afAuth.signOut();
  }
}

