import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss'],
})
export class InfoProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  userImage: string = '';
  newUsername: string = ''; // Definir la variable newUsername

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Obtener datos del usuario al inicializar el componente
    this.getUserData();
  }

  getUserData(): void {
    // Obtener el username del usuario
    this.userService.getUsername()
      .then((username) => {
        this.username = username;
      })
      .catch((error) => {
        console.error('Error al obtener el username:', error);
      });
    // También puedes obtener el email y la imagen del usuario aquí si es necesario
  }

  editProfile(newUsername: string): void {
    // Lógica para editar el perfil
    this.userService.updateUsername(newUsername)
      .then(() => {
        // Actualización exitosa, actualiza el username en el componente
        this.username = newUsername;
      })
      .catch((error) => {
        console.error('Error al actualizar el username:', error);
        // Maneja el error, por ejemplo, mostrando un mensaje al usuario
      });
  }
}
