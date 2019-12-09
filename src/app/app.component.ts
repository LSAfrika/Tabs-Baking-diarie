import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer, Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FireBaseManagerservice } from './services/FireBaseManager.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  // todo remeber to set this to true
  showsplash = false;
  showspinner = false;
  ReturnedUserSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public FirebaseManager: FireBaseManagerservice

  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      //  console.log('working console log ');

      this.router.navigate(['/tabs/tab1']);




      this.FirebaseManager.CheckLogin();

      // this.FirebaseManager.Spinner.subscribe(result => {
      //   this.showsplash = result;

      // });
      // console.log('boolean state: ', this.showsplash);

      if (this.platform.is('cordova')) {
        this.FirebaseManager.Logintype = 1;

      } else {
        this.FirebaseManager.Logintype = 2;


      }
      this.splashScreen.hide();


      this.statusBar.styleDefault();



      this.FirebaseManager.InitialLoading.subscribe(initialload => {
        this.showsplash = initialload;
        this.showspinner = initialload;
        console.log('value of loading boolean: ', initialload);
      });

    });

  }
}
