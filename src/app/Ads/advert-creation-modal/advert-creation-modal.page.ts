import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-advert-creation-modal',
  templateUrl: './advert-creation-modal.page.html',
  styleUrls: ['./advert-creation-modal.page.scss'],
})
export class AdvertCreationModalPage implements OnInit {

  SelectedAdtype = '';
  ProceedToSelected = '';
  BakersFormData: FormGroup;
  ShopFormData: FormGroup;
  JobFormData: FormGroup;
  checked1 = false;
  checked2 = false;
  checked3 = false;

  constructor(private fb: FormBuilder ) { }




  ngOnInit() {

    this.Shopsform();
    this.Bakersform();
    this.Jobsform();
    this.AddAccesoriesListing();
    this.AddCakeListing();

  }

 Bakersform() {
   console.log('baker is working');
   this.BakersFormData = this.fb.group({


   });
 }





//#region SHOP REACTIVE FORM LOGIC


 Shopsform() {
  console.log('shop is working');
  this.ShopFormData = this.fb.group({

    ShopName: ['', [Validators.required, Validators.minLength(5)]],

    ShopContacts: [null, [Validators.required, Validators.minLength(9)]],

    ShopEmail: ['', Validators.email],

    ShopLocation: ['', [Validators.required, Validators.minLength(3)]],

    ShopDescription: ['', [Validators.required, Validators.minLength(50)]],

    CakeTypes: this.fb.array([]),

    AccesoriesListing: this.fb.array([]),
    ImageUrl: '',


  });
}

// todo: SETTING GETTERS FOR FORMARRAYS

get ShopName() {
  return this.ShopFormData.get('ShopName');
}

get ShopContacts() {
  return this.ShopFormData.get('ShopContacts');
}

get ShopEmail() {
  return this.ShopFormData.get('ShopEmail');
}

get ShopLocation() {
  return this.ShopFormData.get('ShopLocation');
}

get ImageUrl() {
  return this.ShopFormData.get('ImageUrl');
}

get ShopDescription() {
  return this.ShopFormData.get('ShopDescription');
}

get CakeTypesArray() {
  return this.ShopFormData.get('CakeTypes') as FormArray;
}

get AccesoriesListingArray() {
  return this.ShopFormData.get('AccesoriesListing') as FormArray;
}



// todo: Methods to populate cakes and accessories listings



AddCakeListing(loadCakes?: string) {
  const caketype = this.fb.group({
    cake: ['', [Validators.required, Validators.minLength(3)]]

  });

  this.CakeTypesArray.push(caketype);
}

// todo REMOVE ITEM FROM CAKE ARRAY
deleteCake(i) {
  this.CakeTypesArray.removeAt(i);

}




AddAccesoriesListing(loadAccesories?: string) {
  const Accesories = this.fb.group({
    accesory: ['', [Validators.required, Validators.minLength(3)]]

  });

  this.AccesoriesListingArray.push(Accesories);
}

// todo REMOVE ITEM FROM CAKE ARRAY
deleteAccesories(i) {
  this.AccesoriesListingArray.removeAt(i);

}



//#endregion


//#region BAKING JOBS REACTIVE FORM LOGIC
Jobsform() {
  console.log('job is working');
  this.JobFormData = this.fb.group({

    title: ['', [Validators.required, Validators.minLength(5)]],
    owner_name: ['', [Validators.required, Validators.minLength(5)]],
    owner_contacts: [0, [Validators.required]],
    cake_type: ['', [Validators.required, Validators.minLength(5)]],
    cake_weight: [0, [Validators.required, ]],
    cake_number: [0, [Validators.required]],
    job_description: ['', [Validators.required, Validators.minLength(50)]],
    delivery_date: [null, [Validators.required]],

  });
}

 // todo GETTERS FOR BAKERS LISTING \\

 get title() {
  return this.BakersFormData.get('title');
}

get ownername() {
 return this.JobFormData.get('owner_name');
}

get ownercontacts() {
 return this.JobFormData.get('owner_contacts');
}

get cake_type() {
 return this.JobFormData.get('cake_type');
}

get cake_weight() {
 return this.JobFormData.get('cake_weight');
}
get cake_number() {
 return this.JobFormData.get('cake_number');
}
get job_description() {
 return this.JobFormData.get('job_description');
}
get delivery_date() {
 return this.JobFormData.get('delivery_date');
}

//#endregion

dateparser(date) {
//  console.log('form value: ', date);
  const datenumber = Date.parse(date);
  console.log('value in iso: ', datenumber);
  const datestring = formatDate(datenumber, 'yyyy-MM-dd', 'en-KE');
  console.log('value in date pipe: ', datestring);
  // ,

}


submitJobsFormvalue(val: {}) {
  console.log('date form value: ', this.delivery_date.value);
  this.PatchDatevalue();
  console.log(val);
  this.dateparser(this.delivery_date.value);

}

PatchDatevalue() {

 const numberdate = Date.parse(this.delivery_date.value);
 this.JobFormData.patchValue({delivery_date: numberdate});
 console.log('updated date value: ', this.delivery_date.value ,numberdate);
}

// TODO: ====================================================================================================\\



  SelectedAd(ad: string) {
    if (ad === 'Job') {
      this.SelectedAdtype = ad;
      this.checked3 = true;
      this.checked2 = false;
      this.checked1 = false;
      console.log('slected ad type: ', this.SelectedAdtype);
    } else if (ad === 'Shop') {
      this.SelectedAdtype = ad;
      this.checked3 = false;
      this.checked2 = true;
      this.checked1 = false;
      console.log('slected ad type: ', this.SelectedAdtype);

    } else if (ad === 'Baker') {
      this.SelectedAdtype = ad;
      this.checked3 = false;
      this.checked2 = false;
      this.checked1 = true;
      console.log('slected ad type: ', this.SelectedAdtype);


    }
  }

  Next() {
    this.ProceedToSelected = this.SelectedAdtype;
    this.checked3 = false;
    this.checked2 = false;
    this.checked1 = false;
  }
  back() {

    this.ProceedToSelected = '';
    this.SelectedAdtype = '';
   
  }


}
