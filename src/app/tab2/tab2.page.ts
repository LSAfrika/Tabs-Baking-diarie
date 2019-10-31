import { Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
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

constructor( public FireBaseService: FireBaseManagerservice,
             private alertctrl: AlertController,
             private router: Router) {

  // this.JobsListingFireStore();
  // this.BakersListingFireStore();
  // this.ShopsListingFireStore();

  this.filterSubject(1);


}







ngOnInit() {

this.LoadingFromDataBase() ;

}


ngOnDestroy() {
  this.LocalsJobListingSubscription.unsubscribe();
  this.LocalsBakersListingSubscription.unsubscribe();
  this.LocalsShopListingSubscription.unsubscribe();
}



LoadingFromDataBase() {
  this.LocalsJobListingSubscription = this.FireBaseService.BakingJobsObservable.subscribe(BakingJobs => {

    if (BakingJobs) {
      this.FireBaseService.BakingJobs = BakingJobs;
      console.log('list of Baking jobs: ', BakingJobs);
      this.DataLoaded = true;


    } else {
      console.log('no bakering jobs listing at the moment');
    }

  });

  this.LocalsBakersListingSubscription = this.FireBaseService.BakersObservable.subscribe (Bakers => {

    if (Bakers) {
        this.FireBaseService.BakersListing = Bakers;
        console.log('list of Bakers: ', Bakers);
        this.DataLoaded = true;


    } else {
      console.log('no bakers listing at the moment');
    }

  });


  this.LocalsShopListingSubscription = this.FireBaseService.ShopsObservable.subscribe (Shops => {

    if (Shops) {
        this.FireBaseService.ShopsListing = Shops;
        console.log('list of Shops: ', Shops);
        this.DataLoaded = true;



    } else {
      console.log('no Shops listing at the moment');
    }

  });

}


filterSubject(filter: number) {

  if (filter === 1) {
    this.FireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.FireBaseService.viewedAdtype);

    this.filter = 'bakers near you';
  } else if (filter === 2) {
    this.FireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.FireBaseService.viewedAdtype);

    this.filter = 'accessories shops near you';

  } else if (filter === 3) {
    this.FireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.FireBaseService.viewedAdtype);


    this.filter = 'baking jobs near you';

  }
}





logScrolling(event) {
  // console.log(event.detail.scrollTop);
  this.Actualvalue = event.detail.scrollTop;

  if ( this.InitialScrollvalue > this.Actualvalue ) {
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


MenuPopOver() {
  console.log('event being triggered');

}



viewBakerListing(index: number ) {

  this.FireBaseService.viewBakerListing(index);
}

viewJobListing(index: number) {

  this.FireBaseService.viewJobListing(index);



}



AdvertCreation() {

  if (this.FireBaseService.FacebookloginState === true) {

    this.router.navigate(['/advert-creation-modal']);


  } else {
    this.LoginAlert();

  }


}

async LoginAlert() {
   const alertFb = await  this.alertctrl.create ({
     message: 'please sign <strong>in / up</strong> to create your ad ',

     buttons: [
       {
         text: 'sign in/up',
         handler: () => {
         this.FireBaseService.facebooklogin();
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
