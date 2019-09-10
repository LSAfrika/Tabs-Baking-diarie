import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-creation-modal',
  templateUrl: './advert-creation-modal.page.html',
  styleUrls: ['./advert-creation-modal.page.scss'],
})
export class AdvertCreationModalPage implements OnInit {

  SelectedAdtype = '';
  ProceedToSelected ='';
  BakersFormData: FormGroup;
  ShopFormData: FormGroup;
  JobFormData: FormGroup;

  constructor(private fb: FormBuilder) { }




  ngOnInit() {
  
    this.Bakersform();
    this.Shopsform();
    this.Jobsform();
    
  }

 Bakersform() {
   console.log('baker is working');
   this.BakersFormData = this.fb.group({

   });
 }

 Shopsform() {
  console.log('shop is working');
  this.ShopFormData = this.fb.group({
    
  });
}

Jobsform() {
  console.log('job is working');
  this.JobFormData = this.fb.group({
    
  });
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

  Next() {
    this.ProceedToSelected = this.SelectedAdtype;
  }
  back() {

    this.ProceedToSelected = '';
    this.SelectedAdtype = '';
  }


}
