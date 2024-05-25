
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CamaraService } from '../camara.service';
import { Foto } from '../fotos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss'],
})
export class InfoProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  userImage: string = '';
  newUsername: string = '';
  public fotos: Foto[] = [];
  imageUrl: string = '';

  constructor(private userService: UserService, private camaraService: CamaraService, private router: Router) { }

  ngOnInit(): void {
    // Obtener datos del usuario al inicializar el componente
    this.getUserData();
    this.getUserImageUrl(); // Obtener la URL de la imagen del usuario
    this.fotos = this.camaraService.fotos;
  }

  addPhotoToGallery() {
    this.camaraService.addNewToGallery();
  }

  async getUserData(): Promise<void> {
    try {
      this.username = await this.userService.getUsername(); // Obtener el username del usuario
    } catch (error) {
      console.error('Error al obtener el username:', error);
    }
  }

  async getUserImageUrl(): Promise<void> {
    try {
      this.imageUrl = await this.userService.getUserImageUrl(); // Obtener la URL de la imagen del usuario
    } catch (error) {
      console.error('Error al obtener la URL de la imagen del usuario:', error);
    }
  }

  editProfile(newUsername: string): void {
    this.userService.updateUsername(newUsername)
      .then(() => {
        this.username = newUsername;
        window.location.reload(); // Recarga la página después de actualizar el nombre de usuario
      })
      .catch((error) => {
        console.error('Error al actualizar el username:', error);
      });
  }

}
