import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModalModule } from './game-modal/game-modal.module'; 

import { FirestoreModule } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, GameModalModule,FirestoreModule, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => {
    const auth = getAuth();
    connectAuthEmulator(auth, 'https://localhost:9099', {disableWarnings: true});
    return auth;
  }), 
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'https://localhost', 9098);
      return firestore;
    }), provideFirebaseApp(() => initializeApp({"projectId":"gamestore-d3f5c","appId":"1:1058806512168:web:71ac10fdd50a3da7ac931d","storageBucket":"gamestore-d3f5c.appspot.com","apiKey":"AIzaSyAiSEzzr0GzuCinSKda4Q1GkHSU7fuEhO4","authDomain":"gamestore-d3f5c.firebaseapp.com","messagingSenderId":"1058806512168"}))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
