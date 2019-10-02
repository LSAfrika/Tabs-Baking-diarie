
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { BakersInterface } from '../interfaces/BakerListing.interface';
import { BakingJobInterface } from '../interfaces/BakingJob.interace';


export interface Item { location: string;
                        uid?: string;
                      }
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']

})
export class Tab2Page implements OnInit {

  SearchBarActive = false;
  filter = '';

  InitialScrollvalue = 0;
  Actualvalue = 0;
  IsSearchBarVisible = true;


private itemsCollection: AngularFirestoreCollection<BakingJobInterface>;
items: Observable<BakingJobInterface[]>;
localitems: BakingJobInterface [] = [];
LocalsSub: Subscription;
constructor(private afs: AngularFirestore) {
  this.itemsCollection = afs.collection<BakingJobInterface>('JobPostingAdvertisements');
  this.items = this.itemsCollection.snapshotChanges().pipe(
    map(returneditems =>{
      return returneditems.map(RI => {
        const uid = RI.payload.doc.id;
        const data = RI.payload.doc.data();

        return { uid, ...data};

      });
    })
  );
  this.filterSubject(1);

}

ngOnInit() {
  this.LocalsSub = this.items.subscribe(res => {
    this.localitems = res;
    console.log('list of items: ', res);
  });
}


filterSubject(filter: number) {

  if (filter === 1) {
    this.filter = 'bakers near you';
  } else if (filter === 2) {
    this.filter = 'accessories shops near you ';

  } else if (filter === 3) {
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

}
