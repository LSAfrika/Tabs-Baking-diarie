import { UserInterface } from './interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {timer, Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { FireBaseManagerservice } from './services/FireBaseManager.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  // todo remeber to set this to true
  showsplash = true;
  showspinner = true;
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
  //  console.log('splash state: ', this.showsplash);

    this.FirebaseManager.CheckLogin();

    this.FirebaseManager.Spinner.subscribe(result => {
    this.showsplash = result;

  });
   // console.log('boolean state: ', this.showsplash);

    if (this.platform.is('cordova')) {
      this.FirebaseManager.Logintype = 1;

    } else {
      this.FirebaseManager.Logintype = 2;


    }

    this.statusBar.styleDefault();
    // this.splashScreen.hide();
    timer(500).subscribe(() => this.router.navigate(['/tabs/tab1']));
    timer(2000).subscribe(() => this.splashScreen.hide() );

     } );

  }

  disablesplash() {
    this.showsplash = false;

  }

  facebooklogin() {
    this.FirebaseManager.facebooklogin();
  }

  Logout() {
    this.FirebaseManager.logout();

  }


  ngOnInit() {



  }
}
