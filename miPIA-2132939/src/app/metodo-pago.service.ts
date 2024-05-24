import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MetodoPagoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  // Método para enviar datos de método de pago a Firebase
  enviarMetodoPago(metodoPagoData: any) {
    // Obtener el UID del usuario actual
    const uid = this.authService.userData.uid;

    // Comprobar si hay un UID válido
    if (uid) {
      // Setear o actualizar los datos del método de pago en la colección "MetodoPago"
      return this.firestore.collection('MetodoPago').doc(uid).set(metodoPagoData, { merge: true });
      // Utilizamos { merge: true } para que si el documento ya existe, solo se actualicen los campos proporcionados en metodoPagoData
    } else {
      // Manejar el caso en que no haya un UID válido
      console.error('No se pudo obtener el UID del usuario.');
      throw new Error('No se pudo obtener el UID del usuario.'); // Lanza una excepción en caso de error
    }
  }

  getCardNumber(uid: string): Promise<string | undefined> {
    return this.firestore.collection('MetodoPago').doc(uid).get()
      .toPromise()
      // En el servicio MetodoPagoService
      .then(doc => doc?.exists ? (doc.data() as { cardNumber?: string })?.cardNumber : undefined)

      .catch(error => {
        console.error('Error al obtener el número de tarjeta:', error);
        throw error;
      });
  }
}