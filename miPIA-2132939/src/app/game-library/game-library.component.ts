import { Component, OnInit } from '@angular/core';
import { GameLibraryService } from '../game-library.service';
import { Game } from '../game.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-library',
  templateUrl: './game-library.component.html',
  styleUrls: ['./game-library.component.scss'],
})
export class GameLibraryComponent implements OnInit {
  libraryItems: Game[] = [];

  constructor(private libraryService: GameLibraryService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.libraryService.getLibraryItems(uid).subscribe((items: any[]) => {
          this.libraryItems = items;
        });
      }
    });
  }

  removeFromLibrary(index: number) {
    this.libraryService.removeFromLibrary(index);
  }

  clearLibrary() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.libraryService.clearLibrary(uid)
          .then(() => console.log('Library cleared successfully'))
          .catch(error => console.error('Error clearing library:', error));
      }
    });
  }
}








