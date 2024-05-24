import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Foto } from './fotos.model';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public fotos: Foto[] = [];

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const user = await this.afAuth.currentUser;
    if (user && user.uid) {
      const savedImageFile = await this.uploadImageToFirebase(capturedPhoto, user.uid);
      if (savedImageFile && savedImageFile.webViewPath) {
        await this.updateUserImageUrl(user.uid, savedImageFile.webViewPath);
      } else {
        console.error('Saved image file or webViewPath is undefined');
      }
    } else {
      console.error('User or UID is undefined');
    }
  }

  private async uploadImageToFirebase(photo: Photo, uid: string): Promise<Foto> {
    // Convert photo to blob format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    // Define the file path in Firebase Storage
    const filePath = `images/${uid}.jpeg`;
    const fileRef = this.storage.ref(filePath);

    // Upload the file to Firebase Storage
    const task = this.storage.upload(filePath, blob);

    // Get the download URL
    return new Promise<Foto>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            resolve({
              filepath: filePath,
              webViewPath: downloadURL
            });
          } catch (error) {
            reject(error);
          }
        })
      ).subscribe();
    });
  }

  private async updateUserImageUrl(uid: string, imageUrl: string) {
    try {
      await this.firestore.collection('Users').doc(uid).set({ imageUrl }, { merge: true });
    } catch (error) {
      console.error('Error updating user image URL:', error);
    }
  }
}
