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
  constructor(public FireBaseManager: FireBaseManagerservice) { }

  ngOnInit() {
    this.UserSubScription = this.FireBaseManager.UserObservable.subscribe((user: UserInterface) => {

      if (user) {
        this.LoggedIn = true;
        this.ReturnedUser = user;
        console.log('bio page user: ', this.ReturnedUser);

      } else {
        this.LoggedIn = false;


      }
      
    }, err => {
      console.log('error from subscription', err);
    });
  }

ngOnDestroy() {
  this.UserSubScription.unsubscribe();
}


  logout() {
this.FireBaseManager.logout();
this.LoggedIn = false;
  }

    Login() {
    this.FireBaseManager.facebooklogin();


  }


  

  tabSwitch(tab: string) {
    if (tab === 'notifications') {
      this.Tabs = tab;

    } else if (tab === 'profile') {

      this.Tabs = tab;


    }
  }

}
