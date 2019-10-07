import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { BakingJobInterface } from '../interfaces/BakingJob.interace';
import { BakersInterface } from '../interfaces/BakerListing.interface';
import { ShopsListingInterface } from '../interfaces/ShopsListing.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdvertmanagerService {


  // todo FIRESTORE COLLECTIONS \\
private JobCollection: AngularFirestoreCollection<BakingJobInterface>;
private BakersCollection: AngularFirestoreCollection<BakersInterface>;
private ShopsCollection: AngularFirestoreCollection<ShopsListingInterface>;

// TODO OBSERVABLES FOR COLLECTIONS
BakingJobsObservable: Observable<BakingJobInterface[]>;
BakersObservable: Observable<BakersInterface[]>;
ShopsObservable: Observable<ShopsListingInterface[]>;

  // TODO LOCAL ARRAYS
  BakingJobs: BakingJobInterface [] = [];
  BakersListing: BakersInterface [] = [];
  ShopsListing: ShopsListingInterface [] = [];

// todo View Specific add
ReturnedJob: BakingJobInterface ;
ReturnedBaker: BakersInterface ;
ReturnedShop: ShopsListingInterface ;

  constructor(private afs: AngularFirestore, private router: Router) {

    this.JobsListingFireStore();
    this.BakersListingFireStore();
    this.ShopsListingFireStore();
   }



  JobsListingFireStore() {
    this.JobCollection = this.afs.collection<BakingJobInterface>('JobPostingAdvertisements');
    this.BakingJobsObservable = this.JobCollection.snapshotChanges().pipe(
      map(returneditems => {
        return returneditems.map(RI => {
          const uid = RI.payload.doc.id;
          const data = RI.payload.doc.data();
  
          return { uid, ...data};
  
        });
      })
    );
  
  }
  
  BakersListingFireStore() {
    this.BakersCollection = this.afs.collection<BakersInterface>('BakersAdvertisements');
    this.BakersObservable = this.BakersCollection.snapshotChanges().pipe(
      map(returneditems => {
        return returneditems.map(RI => {
          const uid = RI.payload.doc.id;
          const data = RI.payload.doc.data();
  
          return { uid, ...data};
  
        });
      })
    );
  
  }
  
  
  ShopsListingFireStore() {
    this.ShopsCollection = this.afs.collection<ShopsListingInterface>('ShopAdvertisements');
    this.ShopsObservable = this.ShopsCollection.snapshotChanges().pipe(
      map(returneditems => {
        return returneditems.map(RI => {
          const uid = RI.payload.doc.id;
          const data = RI.payload.doc.data();
  
          return { uid, ...data};
  
        });
      })
    );
  
  }


viewBakerListing(index: number, AdType?: string) {

  this.ReturnedBaker = this.BakersListing[index];

  console.log('returned Baker: ', this.ReturnedBaker);
  this.router.navigate(['/view-advert-modal']);


}

viewShopListing(index: number, AdType?: string) {
  this.ReturnedShop = this.ShopsListing[index];
  console.log('returned shop: ', this.ReturnedShop);
  this.router.navigate(['/view-advert-modal']);


}

viewJobListing(index: number, AdType?: string) {

  this.ReturnedJob = this.BakingJobs[index];

  console.log('returned Job:', this.ReturnedJob);
  this.router.navigate(['/view-advert-modal']);


}





}
