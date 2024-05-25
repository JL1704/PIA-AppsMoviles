import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  imageHome: string = "https://firebasestorage.googleapis.com/v0/b/gamestore-d3f5c.appspot.com/o/Banner%20Tecnolog%C3%ADa%20Oferta%20Especial%20Morado%20y%20Negro.png?alt=media&token=35d15bc2-0c49-4ef3-97fa-2e15b59408a5";
  constructor() { }

  ngOnInit() {
  }

}
