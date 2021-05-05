import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public user: {
    name: '',
    email: ''
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private router: Router
  ) {
    this.initializeApp();
  }

  openedMenu() {
    this.storageService.get('user').then(user => {
      this.user = user;
    });
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/login']);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
