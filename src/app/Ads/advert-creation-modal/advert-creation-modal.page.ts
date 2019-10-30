import { FireBaseManagerservice } from './../../services/FireBaseManager.service';
import { BakingJobInterface } from './../../interfaces/BakingJob.interace';
import { ShopsListingInterface } from './../../interfaces/ShopsListing.interface';
import { BakersInterface } from './../../interfaces/BakerListing.interface';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


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

  private BakersCollection: AngularFirestoreCollection<BakersInterface>;
  private ShopsCollection: AngularFirestoreCollection<ShopsListingInterface>;
  private JobsCollection: AngularFirestoreCollection<BakingJobInterface>;
  storeimagelink: string;

  constructor(private fb: FormBuilder,
              private actionSheetController: ActionSheetController,
              private afs: AngularFirestore,
              private alertctrl: AlertController,
              private loadingctrl: LoadingController,
              public firebasemanager: FireBaseManagerservice,
              private router: Router,
              private sanitizer: DomSanitizer ) {

                this.BakersCollection = this.afs.collection<BakersInterface>('BakersAdvertisements');
                this.ShopsCollection = this.afs.collection<ShopsListingInterface>('ShopAdvertisements');
                this.JobsCollection = this.afs.collection<BakingJobInterface>('JobPostingAdvertisements');

      }




  ngOnInit() {

    console.log('image link: ', this.storeimagelink);
    this.Shopsform();
    this.Bakersform();
    this.Jobsform();
    this.firebasemanager.storeimagelink.subscribe(link => {

      this.updateBakerImageValue(link);
      this.storeimagelink = link;
      console.log('image link from subject: ', this.storeimagelink);



    });



  }

// todo ================================ BAKERS FORM REGION ==============================================
  //#region bakers form controll
 Bakersform() {
   console.log('baker is working');
   this.BakersFormData = this.fb.group({

    BakerName: ['', [Validators.required, Validators.minLength(5)]],

    BakerContacts: this.fb.array([]),

    BakerEmail: ['', Validators.email],

    BakerImageUrl: null,

    BakerLocation: ['', [Validators.required, Validators.minLength(3)]],

    BakerDescription: ['', [Validators.required, Validators.minLength(50)]],

    CakeImagesUrl: this.fb.array([]),

    BakerCakes: this.fb.array([]),



   });
 }


 updateBakerImageValue(value) {
  this.BakersFormData.patchValue({
    BakerImageUrl: value
  });
  console.log('the uploaded image link  to form : ', this.BakerImageUrl.value);
  console.log('form data for bakers : ', this.BakersFormData.value);

}

 // todo: Methods to populate CONTACTS and accessories listings
BakerContactsListing(contactsedit?: string) {
  const contacts = this.fb.group({
    contact: ['', [Validators.required, Validators.minLength(3)]]

  });

  this.BakerContactsArry.push(contacts);
}

// todo REMOVE ITEM FROM CAKE ARRAY
DeleteBakerContact(i) {
  this.BakerContactsArry.removeAt(i);

}

BakerCakeListing(caketypes?: string) {
  const caketype = this.fb.group({
    cake: ['', [Validators.required, Validators.minLength(3)]]

  });

  this.BakerCakesArray.push(caketype);
}

// todo REMOVE ITEM FROM CAKE ARRAY
DeleteBakerCakes(i) {
  this.BakerCakesArray.removeAt(i);

}

// todo FORM CONTROLS GETTERS \\
//#region BAKERS GETTERS
get BakerName() {
  return this.BakersFormData.get('BakerName');
}

get BakerContactsArry() {
  return this.BakersFormData.get('BakerContacts') as FormArray;
}

get BakerEmail() {
  return this.BakersFormData.get('BakerEmail');
}

get BakerImageUrl() {
  return this.BakersFormData.get('BakerImageUrl');
}


get BakerLocation() {
  return this.BakersFormData.get('BakerLocation');
}

get BakerDescription() {
  return this.BakersFormData.get('BakerDescription');
}

get CakeImagesUrlArray() {
  return this.BakersFormData.get('CakeImagesUrl') as FormArray;
}

get BakerCakesArray() {
  return this.BakersFormData.get('BakerCakes') as FormArray;
}
//#endregion


// todo: METHOD TO POLPULATE CAKE TYPES





// todo FILES TO BE UPLOADED ARRAY

productimageupload(event) {

  this.firebasemanager.productImages(event);

}




 //#endregion

// todo ================================ SHOP FORM REGION ==============================================
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
    ShopImageUrl: null,


  });
 // console.log('shop form: ', this.ShopFormData.value);
}

// todo: SETTING GETTERS FOR FORMARRAYS
//#region getters for shop form
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

get ShopImageUrl() {
  return this.ShopFormData.get('ShopImageUrl');
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
//#endregion


updateshopImageValue(value) {
  this.ShopFormData.patchValue({
    ShopImageUrl: value
  });
}

// todo ACTION SHEET FOR IMAGE SELECTION \\
async launchActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select Image source',
    buttons: [{
      text: 'Load from Library',
      icon: 'images',
      handler: () => {
       // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
      }
    },
    {
      text: 'Use Camera',
      icon: 'camera',
      handler: () => {
      //  this.takePicture(this.camera.PictureSourceType.CAMERA);
      }
    },
    {
      icon: 'close-circle',
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}

// TODO IMAGE LOGIC \\









// todo: Methods to populate cakes and accessories listings



AddShopCakeListing(loadCakes?: string) {
  const caketype = this.fb.group({
    cake: ['', [Validators.required, Validators.minLength(3)]]

  });

  this.CakeTypesArray.push(caketype);
}

// todo REMOVE ITEM FROM CAKE ARRAY
deleteShopCake(i) {
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

// todo ================================ JOBS FORM REGION ==============================================
//#region BAKING JOBS REACTIVE FORM LOGIC
Jobsform() {
  console.log('job is working');
  this.JobFormData = this.fb.group({

    title: ['', [Validators.required, Validators.minLength(5)]],
    orderOwnerName: ['', [Validators.required, Validators.minLength(5)]],
    orderOwnerNameContacts: [0, [Validators.required]],
    cakeType: ['', [Validators.required, Validators.minLength(5)]],
    cakeweight: [0, [Validators.required, ]],
    numberOfCakes: [0, [Validators.required]],
    jobDescription: ['', [Validators.required, Validators.minLength(50)]],
    deliveryDate: [null, [Validators.required]],

  });
}

 // todo GETTERS FOR BAKERS LISTING \\

 get title() {
  return this.BakersFormData.get('title');
}

get ownername() {
 return this.JobFormData.get('orderOwnerName');
}

get ownercontacts() {
 return this.JobFormData.get('orderOwnerNameContacts');
}

get caketype() {
 return this.JobFormData.get('cakeType');
}

get cakeweight() {
 return this.JobFormData.get('cakeweight');
}
get cakenumber() {
 return this.JobFormData.get('numberOfCakes');
}
get jobdescription() {
 return this.JobFormData.get('jobDescription');
}
get deliverydate() {
 return this.JobFormData.get('deliveryDate');
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



ImageInput(event) {
  this.presentLoading('uploading store image');
  const pic = event.target.files[0];
  this.firebasemanager.uploadstoreimage(pic, this.loadingctrl);
}

async presentLoading(messagetype: string) {
  const loading = await this.loadingctrl.create({
    message: messagetype ,
    spinner: 'bubbles'
  });
  await loading.present();
}

submitJobsFormvalue(val) {

  this.presentLoading('uploading job document');
  console.log('job form data: ', val);


  this.JobsCollection.doc<BakingJobInterface>(`BakersAdvertisements'/${this.firebasemanager.ReturnedUser.uid}`)
  .set(val, {merge: true}).then(() => {
    this.loadingctrl.dismiss();
    console.log('submitted job form data: ', val);
    this.Alertnotification('baking job has been submitted');
  }).catch((err) => {
    console.log('error:', err);
    this.presentLoading(JSON.stringify(err));
  });

}

submitBakerFormvalue(val) {

  this.presentLoading('uploading baker\'s profile');
  console.log('bakers form data: ', val);
  this.BakersCollection.doc<BakersInterface>(`${this.firebasemanager.ReturnedUser.uid}`)
  .set(val, {merge: true}).then(() => {
    this.loadingctrl.dismiss();
    console.log('submitted bakers form data: ', val);
    this.Alertnotification('baker listing has been submitted');
  }).catch((err) => {
    console.log('error:', err);
    this.presentLoading(JSON.stringify(err));
  });

}

submitShopFormvalue(val) {
  this.presentLoading('uploading shop\'s profile');
  console.log('shop form data: ', val);

  this.ShopsCollection.add(val).then(() => {
    this.loadingctrl.dismiss();
    console.log('submitted shop lisiting form data: ', val);
    this.Alertnotification('shop lisiting has been submitted');
  }).catch((err) => {
    console.log('error:', err);
    this.presentLoading(JSON.stringify(err));
  });

}

PatchDatevalue() {

 const numberdate = Date.parse(this.deliverydate.value);
 this.JobFormData.patchValue({delivery_date: numberdate});
 console.log('updated date value: ', this.deliverydate.value , numberdate);
}


async Alertnotification(headerline: string) {
  const Notification = await this.alertctrl.create({

    header: headerline,
    buttons: [{
      text: 'ok',
      handler: () => {
        this.alertctrl.dismiss();
      }
    }]
  });
  await Notification.present();
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

  backHome() {

    this.ProceedToSelected = '';
    this.SelectedAdtype = '';
    this.firebasemanager.profilepicture = '';
    this.firebasemanager.previewproductImageFiles.splice(0, this.firebasemanager.previewproductImageFiles.length);
    this.firebasemanager.productImageFiles.splice(0, this.firebasemanager.productImageFiles.length);
    this.router.navigate(['/tabs/tab2']);

  }

  deleteimage(i) {
    this.firebasemanager.deleteproductimages(i);
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


profilepicturepreview(event) {
  this.ExtensionChecker(event);
}



ExtensionChecker(event) {
  const uploadpic: File = event.target.files[0];
  const extensilon  = uploadpic.name.substring(uploadpic.name.lastIndexOf('.') + 1);
  console.log('file input ', extensilon);

  if ( extensilon === 'jpg' || extensilon === 'jpeg' ||
       extensilon === 'png' || extensilon === 'PNG' ||
       extensilon === 'JPG' || extensilon === 'JPEG') {
    this.firebasemanager.detectprofilefile(event);



  } else {
   this.WrongfileUpload();

  }
}

async WrongfileUpload() {
  const err = await this.alertctrl.create ({
    message: 'please select an image file',

  });
  await err.present();

  setTimeout(() => {
    this.alertctrl.dismiss();

  }, 3000);
}

}
