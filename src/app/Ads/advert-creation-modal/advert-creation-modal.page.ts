import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-creation-modal',
  templateUrl: './advert-creation-modal.page.html',
  styleUrls: ['./advert-creation-modal.page.scss'],
})
export class AdvertCreationModalPage implements OnInit {

  SelectedAdtype = '';
  constructor() { }




  ngOnInit() {
  //  console.log('slected ad type: ', this.SelectedAdtype);

  }

  SelectedAd(ad: string) {
    if (ad === 'Job') {
      this.SelectedAdtype = ad;
      console.log('slected ad type: ', this.SelectedAdtype);
    } else if (ad === 'Shop') {
      this.SelectedAdtype = ad;
      console.log('slected ad type: ', this.SelectedAdtype);

    } else if (ad === 'Baker') {
      this.SelectedAdtype = ad;
      console.log('slected ad type: ', this.SelectedAdtype);


    }
  }


}
