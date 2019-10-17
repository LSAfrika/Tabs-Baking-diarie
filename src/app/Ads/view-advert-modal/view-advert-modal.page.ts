import { ShopsListingInterface } from './../../interfaces/ShopsListing.interface';
import { BakingJobInterface } from './../../interfaces/BakingJob.interace';
import { FireBaseManagerservice } from '../../services/FireBaseManager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-advert-modal',
  templateUrl: './view-advert-modal.page.html',
  styleUrls: ['./view-advert-modal.page.scss'],
})
export class ViewAdvertModalPage implements OnInit {

  viewedAdtype = 0;
  Label = 'view contact(s)';
  contactview = false;

  images: any [] = [];

  constructor(public FireBaseManager: FireBaseManagerservice) {

    this.images = [
      {image: '/assets/cakes/apple.jpg'},
      {image: '/assets/cakes/cake.jpg'},
      {image: '/assets/cakes/chocolate.jpg'},
      {image: '/assets/cakes/cinnamon.jpg'},
      {image: '/assets/cakes/vw.jpg'},
      {image: '/assets/cakes/sponge.jpg'},
      {image: '/assets/cakes/vanilla.jpg'},
      {image: '/assets/cakes/v.jpg'}
    ];

   }

  ngOnInit() {
    console.log('integer',this.FireBaseManager.viewedAdtype);
    this.contactview = false;

  }

  ngOnDestroy() {
    this.contactview = false;
    
  }

  ViewContact() {
    this.contactview = true;
    
  }
}
