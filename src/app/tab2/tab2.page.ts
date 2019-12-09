import { Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { FireBaseManagerservice } from '../services/FireBaseManager.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']

})
export class Tab2Page implements OnInit, OnDestroy {

  SearchBarActive = false;
  filter = '';

  InitialScrollvalue = 0;
  Actualvalue = 0;
  IsSearchBarVisible = true;

  DataLoaded = false;



  LocalsJobListingSubscription: Subscription;
  LocalsBakersListingSubscription: Subscription;
  LocalsShopListingSubscription: Subscription;

  constructor(public FireBaseManager: FireBaseManagerservice,
    private alertctrl: AlertController,
    private router: Router) {

    // this.JobsListingFireStore();
    // this.BakersListingFireStore();
    // this.ShopsListingFireStore();

    this.filterSubject(1);


  }







  ngOnInit() {

    this.LoadingFromDataBase();

  }


  ngOnDestroy() {
    this.LocalsJobListingSubscription.unsubscribe();
    this.LocalsBakersListingSubscription.unsubscribe();
    this.LocalsShopListingSubscription.unsubscribe();
  }



  LoadingFromDataBase() {
    this.LocalsJobListingSubscription = this.FireBaseManager.BakingJobsObservable.subscribe(BakingJobs => {

      if (BakingJobs) {
        this.FireBaseManager.BakingJobs = BakingJobs;
        //  console.log('list of Baking jobs: ', BakingJobs);
        const JobAvailable = this.FireBaseManager.BakingJobs.find(Job => Job.uid === this.FireBaseManager.ReturnedUser.uid);

        if (JobAvailable) {
          this.FireBaseManager.IsJobAvailable = true;
        } else {
          this.FireBaseManager.IsJobAvailable = false;

        }
        this.DataLoaded = true;


      } else {
        console.log('no bakering jobs listing at the moment');
      }

    });

    this.LocalsBakersListingSubscription = this.FireBaseManager.BakersObservable.subscribe(Bakers => {

      if (Bakers) {
        this.FireBaseManager.BakersListing = Bakers;
        const BakerAvailable = this.FireBaseManager.BakersListing.find(Baker => Baker.uid === this.FireBaseManager.ReturnedUser.uid);

        if (BakerAvailable) {
          this.FireBaseManager.IsBakerAvailable = true;
        } else {
          this.FireBaseManager.IsBakerAvailable = false;


        }
        //    console.log('list of Bakers: ', Bakers);
        this.DataLoaded = true;


      } else {
        console.log('no bakers listing at the moment');
      }

    });


    this.LocalsShopListingSubscription = this.FireBaseManager.ShopsObservable.subscribe(Shops => {

      if (Shops) {
        this.FireBaseManager.ShopsListing = Shops;
        //   console.log('list of Shops: ', Shops);
        const shopAvailable = this.FireBaseManager.ShopsListing.find(Shop => Shop.uid === this.FireBaseManager.ReturnedUser.uid);

        if (shopAvailable) {
          this.FireBaseManager.IsShopAvailable = true;
        } else {

          this.FireBaseManager.IsShopAvailable = false;

        }

        this.DataLoaded = true;



      } else {
        console.log('no Shops listing at the moment');
      }

    });

  }


  filterSubject(filter: number) {

    if (filter === 1) {
      this.FireBaseManager.viewedAdtype = filter;
      console.log('the number is: ', this.FireBaseManager.viewedAdtype);

      this.filter = 'bakers near you';
    } else if (filter === 2) {
      this.FireBaseManager.viewedAdtype = filter;
      console.log('the number is: ', this.FireBaseManager.viewedAdtype);

      this.filter = 'accessories shops near you';

    } else if (filter === 3) {
      this.FireBaseManager.viewedAdtype = filter;
      console.log('the number is: ', this.FireBaseManager.viewedAdtype);


      this.filter = 'baking jobs near you';

    }
  }





  logScrolling(event) {
    // console.log(event.detail.scrollTop);
    this.Actualvalue = event.detail.scrollTop;

    if (this.InitialScrollvalue > this.Actualvalue) {
      this.IsSearchBarVisible = true;
      //  console.log('scrolling to the top \n' + 'boolean value: ', this.IsSearchBarVisible);
    } else {
      this.IsSearchBarVisible = false;
      // console.log('scrolling to the bottom  \n' + ' boolean value: ', this.IsSearchBarVisible);

    }
  }

  logScrollStart() {

    this.InitialScrollvalue = this.Actualvalue;
    // console.log('scorolling has started scroll value : ', this.InitialScrollvalue);


  }

  logScrollEnd() {
    this.InitialScrollvalue = this.Actualvalue;

    // console.log('scorolling has stopped scroll value : ', this.InitialScrollvalue);

  }






  viewBakerListing(index: number) {

    this.FireBaseManager.viewBakerListing(index);
  }

  viewJobListing(index: number) {

    this.FireBaseManager.viewJobListing(index);



  }



  AdvertCreation() {

    if (this.FireBaseManager.FacebookloginState === true) {


      this.FireBaseManager.ViewedAd = 'anonymous';
      this.router.navigate(['/advert-creation-modal']);


    } else {
      this.LoginAlert();

    }


  }

  async LoginAlert() {
    const alertFb = await this.alertctrl.create({
      message: 'please sign <strong>in / up</strong> to create your ad ',

      buttons: [
        {
          text: 'sign in/up',
          handler: () => {
            this.FireBaseManager.facebooklogin();
            this.alertctrl.dismiss();
          }
        },
        {
          text: 'close',
          role: 'cancel'
        }
      ]
    });
    alertFb.present();
  }

}
