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
//import { connectAuthEmulator } from 'firebase/auth';
//import { connectFirestoreEmulator } from 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, GameModalModule,FirestoreModule, ReactiveFormsModule, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), 
    provideFirebaseApp(() => initializeApp({"projectId":"gamestore-d3f5c","appId":"1:1058806512168:web:71ac10fdd50a3da7ac931d","storageBucket":"gamestore-d3f5c.appspot.com","apiKey":"AIzaSyAiSEzzr0GzuCinSKda4Q1GkHSU7fuEhO4","authDomain":"gamestore-d3f5c.firebaseapp.com","messagingSenderId":"1058806512168"})),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
