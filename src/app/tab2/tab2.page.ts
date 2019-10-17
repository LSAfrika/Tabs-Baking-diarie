
import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
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

constructor( public AdsFireBaseService: FireBaseManagerservice, private loadingCtrl: LoadingController) {

  // this.JobsListingFireStore();
  // this.BakersListingFireStore();
  // this.ShopsListingFireStore();

  this.filterSubject(1);

}


ionViewWillEnter() {
  if (this.DataLoaded === true) {

 //   this.loadingCtrl.dismiss();
} else {
  this.Loading();
 

}

 
}

ionViewDidEnter() {
 

}




ngOnInit() {


  this.LocalsJobListingSubscription = this.AdsFireBaseService.BakingJobsObservable.subscribe(BakingJobs => {

    if (BakingJobs) {
      this.AdsFireBaseService.BakingJobs = BakingJobs;
      console.log('list of Baking jobs: ', BakingJobs);
      this.DataLoaded = true;
      this.loadingCtrl.dismiss();

    } else {
      console.log('no bakering jobs listing at the moment');
    }

  });

  this.LocalsBakersListingSubscription = this.AdsFireBaseService.BakersObservable.subscribe (Bakers => {

    if (Bakers) {
        this.AdsFireBaseService.BakersListing = Bakers;
        console.log('list of Bakers: ', Bakers);
        this.DataLoaded = true;

        this.loadingCtrl.dismiss();

    } else {
      console.log('no bakers listing at the moment');
    }

  });


  this.LocalsShopListingSubscription = this.AdsFireBaseService.ShopsObservable.subscribe (Shops => {

    if (Shops) {
        this.AdsFireBaseService.ShopsListing = Shops;
        console.log('list of Shops: ', Shops);
        this.DataLoaded = true;

        this.loadingCtrl.dismiss();

    } else {
      console.log('no Shops listing at the moment');
    }

  });
}
ngOnDestroy() {
  this.LocalsJobListingSubscription.unsubscribe();
  this.LocalsBakersListingSubscription.unsubscribe();
  this.LocalsShopListingSubscription.unsubscribe();
}


filterSubject(filter: number) {

  if (filter === 1) {
    this.AdsFireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.AdsFireBaseService.viewedAdtype);

    this.filter = 'bakers near you';
  } else if (filter === 2) {
    this.AdsFireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.AdsFireBaseService.viewedAdtype);

    this.filter = 'accessories shops near you';

  } else if (filter === 3) {
    this.AdsFireBaseService.viewedAdtype = filter;
    console.log('the number is: ', this.AdsFireBaseService.viewedAdtype);


    this.filter = 'baking jobs near you';

  }
}

 async Loading(message?: string) {
  const Ctrl = await this.loadingCtrl.create({

    message: 'fetching data from server',
    translucent: true,
    backdropDismiss: false,
    spinner: 'lines'

  });
  await Ctrl.present();

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

  this.AdsFireBaseService.viewBakerListing(index);
}

viewJobListing(index: number) {

  this.AdsFireBaseService.viewJobListing(index);



}


}
