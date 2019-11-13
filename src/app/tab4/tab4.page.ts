import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireBaseManagerservice } from '../services/FireBaseManager.service';
import { UserInterface } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { BakingJobInterface } from '../interfaces/BakingJob.interace';
import { BakersInterface } from '../interfaces/BakerListing.interface';
import { ShopsListingInterface } from '../interfaces/ShopsListing.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Page implements OnInit, OnDestroy {
  Tabs = 'notifications';

  returnedUserKeys = false;
  LoggedIn = false;
  ReturnedUser: UserInterface;
  UserSubScription: Subscription;
  loggInSubscription: Subscription;
  currentusersubscription: Subscription;
 
  BakingJobs: BakingJobInterface ;
  BakersListing: BakersInterface ;
  ShopsListing: ShopsListingInterface ;



LocalsJobListingSubscription: Subscription;
LocalsBakersListingSubscription: Subscription;
LocalsShopListingSubscription: Subscription;

  constructor(
    public FireBaseManager: FireBaseManagerservice,
    private router: Router
  ) {
    this.FireBaseManager.CheckLogin();
  }

  ngOnInit() {

    this.currentusersubscription = this.FireBaseManager.UserbehaviourSubject.subscribe(
      returnedUser => {
        const userempty = Object.keys(returnedUser);
        console.log('returnd user behaviour subject', userempty);

        if (userempty.length === 0) {
          console.log(' the object is empty ');
          this.returnedUserKeys = false;
        } else {
          this.returnedUserKeys = true;
        }
      }
    );

    this.loggInSubscription = this.FireBaseManager.behaiourIsLogged.subscribe(
      result => {
        this.LoggedIn = result;
        console.log('firtebase log status tab 4: ', this.LoggedIn);
      }
    );

    if (
      this.FireBaseManager.ReturnedUser !== null ||
      this.FireBaseManager.ReturnedUser !== undefined
    ) {
      console.log('user is not null: ', this.FireBaseManager.ReturnedUser);
    }


    this.LoadingFromDataBase() ;
 

  }

  LoadingFromDataBase() {
    this.LocalsJobListingSubscription = this.FireBaseManager.BakingJobsObservable.subscribe(BakingJobs => {
  
      if (BakingJobs) {
        this.FireBaseManager.BakingJobs = BakingJobs;
        console.log('list of Baking jobs: ', BakingJobs);
       
  
  
      } else {
        console.log('no bakering jobs listing at the moment');
      }
  
    });
  
    this.LocalsBakersListingSubscription = this.FireBaseManager.BakersObservable.subscribe (Bakers => {
  
      if (Bakers) {
          this.FireBaseManager.BakersListing = Bakers;
          console.log('list of Bakers: ', Bakers);
         
  
  
      } else {
        console.log('no bakers listing at the moment');
      }
  
    });
  
  
    this.LocalsShopListingSubscription = this.FireBaseManager.ShopsObservable.subscribe (Shops => {
  
      if (Shops) {
          this.FireBaseManager.ShopsListing = Shops;
          console.log('list of Shops: ', Shops);
         
  
  
  
      } else {
        console.log('no Shops listing at the moment');
      }
  
    });
  
  }
  

  ngOnDestroy() {
    // this.UserSubScription.unsubscribe();
    this.loggInSubscription.unsubscribe();
    this.currentusersubscription.unsubscribe();

    this.LocalsJobListingSubscription.unsubscribe();
    this.LocalsBakersListingSubscription.unsubscribe();
    this.LocalsShopListingSubscription.unsubscribe();
  }

  logout() {
    this.FireBaseManager.logout();
    this.FireBaseManager.CheckLogin();
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

  EditProfile() {
    this.router.navigate(['/profileedit']);
  }

  EditBaker() {
    this.FireBaseManager.OwnerBakerListing(this.FireBaseManager.ReturnedUser.uid);
  }

  EditShop() {
    this.FireBaseManager.OwnerShopListing(this.FireBaseManager.ReturnedUser.uid);

  }

  EditJob() {
    this.FireBaseManager.OwnerJobListing(this.FireBaseManager.ReturnedUser.uid);

  }

  viewBaker() {
    this.FireBaseManager.ViewOwnerBakerListing(this.FireBaseManager.ReturnedUser.uid);
  }

  viewShop() {
    this.FireBaseManager.ViewOwnerShopListing(this.FireBaseManager.ReturnedUser.uid);

  }

  viewJob() {
    this.FireBaseManager.ViewOwnerJobListing(this.FireBaseManager.ReturnedUser.uid);

  }






}
