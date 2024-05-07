import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  imageHome: string = "https://th.bing.com/th/id/OIP.Px6pP-pArBAwRsgZJVrO3wHaEK?rs=1&pid=ImgDetMain";
  constructor() { }

  ngOnInit() {
  }

}
