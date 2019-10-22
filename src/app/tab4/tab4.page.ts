import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireBaseManagerservice } from '../services/FireBaseManager.service';
import { UserInterface } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {


  Tabs = 'notifications';

LoggedIn = false;
  ReturnedUser: UserInterface;
UserSubScription: Subscription;
loggInSubscription: Subscription;
  constructor(public FireBaseManager: FireBaseManagerservice) { this.FireBaseManager.CheckLogin(); }

  ngOnInit() {

    this.loggInSubscription = this.FireBaseManager.behaiourIsLogged.subscribe(result => {

      this.LoggedIn = result;
      console.log('firtebase log status tab 4: ', this.LoggedIn);
    });


   
  }

ngOnDestroy() {
  this.UserSubScription.unsubscribe();
  this.loggInSubscription.unsubscribe();
}


  logout() {
this.FireBaseManager.logout();
this.FireBaseManager.CheckLogin();

  }

    Login() {
    this.FireBaseManager.facebooklogin();


  }


     SwitchBool(){
    
       
     }


  

  tabSwitch(tab: string) {
    if (tab === 'notifications') {
      this.Tabs = tab;

    } else if (tab === 'profile') {

      this.Tabs = tab;


    }
  }

}
