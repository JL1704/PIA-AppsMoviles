import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  // Método para obtener el username del usuario actual desde Firestore
  async getUsername(): Promise<string> {
    try {
      const userUid = this.authService.userData?.uid; // Obtener el UID del usuario actual de forma segura
      if (userUid) {
        const doc = await this.firestore.collection('Users').doc(userUid).get().toPromise();
        if (doc && doc.exists) {
          const userData = doc.data() as { username?: string }; // Definir el tipo de datos esperado
          return userData.username ?? ''; // Devolver el username si existe o una cadena vacía si no
        }
      }
      return ''; // Devolver una cadena vacía si no se encontró el documento o el UID del usuario
    } catch (error) {
      console.error('Error al obtener el username:', error);
      return ''; // Devolver una cadena vacía en caso de error
    }
  }

  // Método para obtener la URL de la imagen del usuario actual desde Firestore
  async getUserImageUrl(): Promise<string> {
    try {
      const userUid = this.authService.userData?.uid; // Obtener el UID del usuario actual de forma segura
      if (userUid) {
        const doc = await this.firestore.collection('Users').doc(userUid).get().toPromise();
        if (doc && doc.exists) {
          const userData = doc.data() as { imageUrl?: string }; // Definir el tipo de datos esperado
          return userData.imageUrl ?? ''; // Devolver la imageUrl si existe o una cadena vacía si no
        }
      }
      return ''; // Devolver una cadena vacía si no se encontró el documento o el UID del usuario
    } catch (error) {
      console.error('Error al obtener la imageUrl:', error);
      return ''; // Devolver una cadena vacía en caso de error
    }
  }

  // Método para actualizar el username del usuario en Firestore
  async updateUsername(newUsername: string): Promise<void> {
    try {
      const userUid = this.authService.userData?.uid; // Obtener el UID del usuario actual de forma segura
      if (userUid) {
        await this.firestore.collection('Users').doc(userUid).update({ username: newUsername });
      }
    } catch (error) {
      console.error('Error al actualizar el username:', error);
      throw error; // Relanzar el error para manejarlo en el componente
    }
  }
}

