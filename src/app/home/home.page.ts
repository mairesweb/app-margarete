import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
  }

  goPage(page: string) {
    this.navCtrl.navigateForward(page);
  }

}
