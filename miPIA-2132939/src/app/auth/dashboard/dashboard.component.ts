import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Mostrar un mensaje de alerta con el UID del usuario
       // alert('UID del usuario: ' + user.uid);
        
        // Verificar si ya existe un documento con este UID en la colección "Users"
        this.firestore.collection('Users').doc(user.uid).get().subscribe(doc => {
          if (!doc.exists) {
            // Si no existe, crear un nuevo documento con el UID como ID y el campo UID
            this.firestore.collection('Users').doc(user.uid).set({
              uid: user.uid
            })
            .then(() => console.log('Documento creado exitosamente en la colección Users'))
            .catch(error => console.error('Error al crear el documento:', error));
          } else {
            console.log('El documento ya existe en la colección Users');
          }
        });

        // Verificar si ya existe un documento con este UID en la colección "Users"
        this.firestore.collection('ShoppingCart').doc(user.uid).get().subscribe(doc => {
          if (!doc.exists) {
            // Si no existe, crear un nuevo documento con el UID como ID y el campo UID
            this.firestore.collection('ShoppingCart').doc(user.uid).set({
              uid: user.uid
            })
            .then(() => console.log('Documento creado exitosamente en la colección Users'))
            .catch(error => console.error('Error al crear el documento:', error));
          } else {
            console.log('El documento ya existe en la colección Users');
          }
        });





      } else {
        // Mostrar un mensaje de alerta indicando que no hay usuario autenticado
       // alert('No hay usuario autenticado.');
      }
    });
  }
  


  logOut() {
    this.authService.logOut();
  }
}
