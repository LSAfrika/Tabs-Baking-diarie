import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {timer} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // todo remeber to set this to true
  showsplash = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('platform is ready: ', this.showsplash);
      this.statusBar.styleDefault();
     // this.splashScreen.hide();
      timer(500).subscribe(() => this.router.navigate(['/tabs/tab1']));
      timer(3000).subscribe(() => this.splashScreen.hide() );

     } );

  }

  disablesplash() {
    this.showsplash = false;

  }
}
