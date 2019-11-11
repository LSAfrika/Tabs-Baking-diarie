import { File } from '@ionic-native/file/ngx';
import { UserInterface } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, first} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { BakingJobInterface } from '../interfaces/BakingJob.interace';
import { BakersInterface } from '../interfaces/BakerListing.interface';
import { ShopsListingInterface } from '../interfaces/ShopsListing.interface';
import { Router } from '@angular/router';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
// todo NETWORK PLUGIN \\
import { Network } from '@ionic-native/network/ngx';



// import * as EmptyObservable from 'rxjs/observable/EmptyObservable';
// import {of} from 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class FireBaseManagerservice {



  // todo BOOLEAN TO UPDATE

  UpdateAd = false;
// todo Link for ads creation url

 ViewedAd: string;
 EditAd = '';

  // todo image

  image: File;

  profilepicture = '';

  // todo TEXT LINKING to splash UI \\
  Buttontext = 'skip';
  Alerttext = 'continue without signing in ?';

  // todo Hide ui\\
  FacebookloginState: boolean;
  BioCreationSate: boolean;

  behaiourIsLogged: BehaviorSubject<boolean>;
  Spinner: BehaviorSubject<boolean>;
  storeimagelink: BehaviorSubject<string>;
  UserbehaviourSubject: BehaviorSubject<UserInterface>;
  // todo SPLASH SCREEN UI \\
  SplashScreen = true;

  // todo ASYNC TEST \\
  asyncness = false;

  // TODO JOB TYPE \\
  viewedAdtype = 0;

  // todo LOGIN TYPE \\
  Logintype = 0;
 // loginstate: Subject<boolean> = new BehaviorSubject<boolean>(true);

  // todo FIRESTORE COLLECTIONS \\
private JobCollection: AngularFirestoreCollection<BakingJobInterface>;
private BakersCollection: AngularFirestoreCollection<BakersInterface>;
private ShopsCollection: AngularFirestoreCollection<ShopsListingInterface>;
private User: AngularFirestoreDocument <UserInterface>;
// TODO OBSERVABLES FOR COLLECTIONS
BakingJobsObservable: Observable<BakingJobInterface[]>;
BakersObservable: Observable<BakersInterface[]>;
ShopsObservable: Observable<ShopsListingInterface[]>;
UserObservable: Observable<UserInterface>;
  // TODO LOCAL ARRAYS
  BakingJobs: BakingJobInterface [] = [];
  BakersListing: BakersInterface [] = [];
  ShopsListing: ShopsListingInterface [] = [];

// todo View Specific add
ReturnedJob: BakingJobInterface ;
ReturnedBaker: BakersInterface ;
ReturnedShop: ShopsListingInterface ;
ReturnedUser: UserInterface;
CreateUser: UserInterface;


// todo files array
productImageFiles: File [] = [];
previewproductImageFiles: string [] = [];
productImagesCounter = 0;

  constructor(private afs: AngularFirestore,
              private router: Router,
              private fireAuth: AngularFireAuth,
              private platform: Platform,
              private fb: Facebook,
              private alertctrl: AlertController,
              private AFStorage: AngularFireStorage,
              private newtworkCtrl: Network ) {

    this.JobsListingFireStore();
    this.BakersListingFireStore();
    this.ShopsListingFireStore();
    this.NetworkOnConnect();
    this.NetworkOnDissconnect();

    const emptyUser = {} as UserInterface;
    this.UserbehaviourSubject = new BehaviorSubject(undefined);
    this.behaiourIsLogged = new BehaviorSubject(false);
    this.Spinner = new BehaviorSubject(true);
    this.storeimagelink = new BehaviorSubject('');

   }



   NetworkOnConnect() {

   console.log('on connect function is being called');
   this.newtworkCtrl.onConnect().subscribe(() => {
      console.log('internet active');
    });
   }

   NetworkOnDissconnect() {
    console.log('on Disconnect function is being called');
    
    this.newtworkCtrl.onDisconnect().subscribe(() => {
      console.log('internet offline');
    });
   }





   //  todo ========================================== AUTHORIZATION LOGIC ======================================================
//#region auth




isLoggedIn() {
  return this.fireAuth.authState.pipe(first()).toPromise();
}

async CheckLogin() {
  const user = await this.isLoggedIn();
  if (user) {

    this.behaiourIsLogged.next(true);
    this.FacebookloginState = true;
    this.Buttontext = 'continue';
    this.Alerttext = '';


    this.UserListingFirestore(user.uid, user.displayName, user.photoURL);
   // this.Spinner.next(false);



  //  console.log ('user credentials: ', user);
  } else {

    this.behaiourIsLogged.next(false);
  //  this.Spinner.next(false);

    this.Buttontext = 'skip';
    this.FacebookloginState = false;
    this.Alerttext = 'continue without signing in ?';


    this.UserListingFirestore('no user');

    console.log ('user not logged in ');
 }

}

UserListingFirestore(Uid: string, ReturndisplayName?: string, Returnphotourl?: string) {

  console.log('firebase returned uid:', Uid);

  const path = `Users/${Uid}`;

  this.findOrCreate(path, Uid, ReturndisplayName, Returnphotourl);


}

docExists(path: string, ) {
  return this.afs.doc<UserInterface>(path).valueChanges().pipe(first()).toPromise();
}

async findOrCreate(path: string, Uid: string, ReturndisplayName?: string, Returnphotourl?: string) {

  if (Uid === 'no user') {

      const empty = {} as UserInterface;
      this.ReturnedUser = empty;
      console.log('empty returned user: ', this.ReturnedUser);

      this.UserbehaviourSubject.next(empty);
    }

  const doc = await this.docExists(path);

  if (doc) {

    this.User = this.afs.doc<UserInterface>(path);
    this.ReturnedUser = doc;
    this.UserbehaviourSubject.next(this.ReturnedUser);

  //  this.UserObservable = doc;
    this.BioCreationSate = false;
    this.Spinner.next(false);

    console.log('user exists ');

    // this.UserObservable.subscribe((user: UserInterface) => {
    //   this.ReturnedUser = user;

    // });
  } else {


    this.CreateUser = {
      uid: Uid,
      displayName: ReturndisplayName,
      photoURL: Returnphotourl,
      phone: '',
      bio: ''
    };

    console.log('service new user: ', this.CreateUser);

    const empty = {} as UserInterface;
    this.ReturnedUser = empty;
    this.UserbehaviourSubject.next(empty);

    console.log('empty returned user: ', this.ReturnedUser);

    this.BioCreationSate = true;

// TODO CREATE LOGIC TO TRANSIST TO PROFILE CREATION PAGE

  //  this.router.navigate(['/profileedit']);
    if (this.Spinner.value === false) {
      setTimeout(() => {
        this.Spinner.next(false);

        }, 500);

  }


  }
}





// todo FACEBOOK SIGN IN \\
facebooklogin() {


  if (this.Logintype === 1) { // todo 1 FOR CORDOVA

    this.FacebookCordovalogin();



  } else if (this.Logintype === 2) {  // todo 2 FOR BROWSER
    const FacebookProvider = new auth.FacebookAuthProvider();
    this.fireAuth.auth.signInWithPopup(FacebookProvider).then((LoginResponse) => {
      console.log(LoginResponse.user.uid);
      this.FacebookloginState = true;
      this.SplashScreen = false;
      this.CheckLogin();
      console.log('splash screen status: ', this.SplashScreen);


    }).catch(err => {
      console.log(err);

    });


  }


}

//#endregion

// TODO FACEBOOK CORDOVA

//#region  FACEBOOK CORDOVA

async FacebookCordovalogin() {

  this.fb.login(['email'])
    .then((response: FacebookLoginResponse) => {
      this.onFacebookLoginSuccess(response);
      console.log(response.authResponse.accessToken);
    }).catch((error) => {
      console.log(error);
      const errorstring = JSON.stringify(error);
      alert('error:' + errorstring);
    });
}
onFacebookLoginSuccess(res: FacebookLoginResponse) {
 // const { token } = res;
  const credential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  this.fireAuth.auth.signInWithCredential(credential)
    .then((response) => {
     // this.router.navigate(['/userbio']);
     this.CheckLogin();

    });

}

FBlogout() {
  this.fb.logout().then(() => {
    alert('You have succesfully logged out');

  });
}

logout() {
  this.fireAuth.auth.signOut().then(() => {

    this.platform.ready().then(() => {


        if (this.platform.is('cordova')) {

          console.log('cordova');
          this.FBlogout();


        }

  });
});

}


//#endregion


//#region IMAGES LOGIC
// todo PHOTO UPLOAD LOGIC //
uploadprofilepicture(pic: File, User: UserInterface, loading: LoadingController) {


  const filePath = `Users/${this.CreateUser.uid}/profile/profilepicture`;
  const ref = this.AFStorage.ref(filePath);
  const DBPath = `Users/${this.CreateUser.uid}`;
  ref.put(pic).then(() => {
    ref.getDownloadURL().subscribe(imgLink => {

       const imagedata: UserInterface = {
         displayName: User.displayName,
         bio: User.bio,
         phone: User.phone,
         photoURL: imgLink,
         uid: User.uid
       };


       this.uploadphoto(imagedata, DBPath);
       loading.dismiss();


});





});

}

uploadstoreimage(pic: File, loading: LoadingController) {


  const filePath = `DataStore/Bakerstore/${this.ReturnedUser.uid}/storebannerimage`;
  const ref = this.AFStorage.ref(filePath);

  ref.put(pic).then(() => {
    ref.getDownloadURL().subscribe(imgLink => {

      this.storeimagelink.next(imgLink);

      loading.dismiss();


});





});

}





EditUpdateProfile(data: UserInterface) {

  this.User.set (data, {merge: true}).then((result) => {
    console.log('saved succesfully ');
  });
  this.updatenotifier();


}


CreateProfile(data: UserInterface, uid: string) {

 this.afs.doc(`Users/${uid}`).set (data, {merge: true}).then((result) => {
    console.log('saved succesfully ');
  });
 this.updatenotifier();


}

uploadphoto( data: UserInterface, path: string) {
  this.User = this.afs.doc(path);
  this.User.set (data, {merge: true}).then((result) => {
    console.log('saved succesfully ');
  });
  this.Profileuploadnotifier();

}


productImages(event) {


  this.image = event.target.files[0];

  this.productImageFiles.push(this.image);
  console.log('files included: ', this.productImageFiles);

  this.detectProductFiles(event);


}


detectProductFiles(event) {

  const files = event.target.files;
  if (files) {
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewproductImageFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}

detectprofilefile(event) {

  const file = event.target.files[0];
  if (file) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilepicture = e.target.result;

      };
      reader.readAsDataURL(file);

  }

}

deleteproductimages(i) {

  this.previewproductImageFiles.splice(i, 1);
  this.productImageFiles.splice(i, 1);

}



UploadproductImages() {





}


async updatenotifier() {
  const notify = await this.alertctrl.create({
    message: '<strong>profile updated successfully</strong>',
    backdropDismiss: false,
    translucent: true

  });
  await notify.present();

  setTimeout(() => {
    this.alertctrl.dismiss();
    this.router.navigate(['/tabs/tab4']);
  }, 2000);
}


async Profileuploadnotifier() {
  const notify = await this.alertctrl.create({
    message: '<strong>picture updated successfully</strong>',
    backdropDismiss: false,
    translucent: true

  });
  await notify.present();

  setTimeout(() => {
    this.alertctrl.dismiss();

  }, 2000);
}






//#endregion





   //  todo ========================================== FIRESTORE REGION ======================================================
   //#region  firestore

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


viewBakerListing(index: number) {

  this.ReturnedBaker = this.BakersListing[index];

  if (this.ReturnedBaker) {
  console.log('returned Baker: ', this.ReturnedBaker);
  this.ViewedAd = 'anonymous';

  this.router.navigate(['/view-advert-modal']);
}


}

viewShopListing(index: number) {
  this.ReturnedShop = this.ShopsListing[index];

  if (this.ReturnedShop) {
  console.log('returned shop: ', this.ReturnedShop);
  this.ViewedAd = 'anonymous';

  this.router.navigate(['/view-advert-modal']);
  }

}

viewJobListing(index: number) {

  this.ReturnedJob = this.BakingJobs[index];

  if (this.ReturnedJob) {
  console.log('returned Job:', this.ReturnedJob);
  this.ViewedAd = 'anonymous';

  this.router.navigate(['/view-advert-modal']);
  }

}






// specific user document

OwnerBakerListing(Uid: string) {

  this.ReturnedBaker = this.BakersListing.find(result => result.uid === Uid);

  if (this.ReturnedBaker) {
  console.log('returned Baker: ', this.ReturnedBaker);
  this.viewedAdtype = 1;
  this.ViewedAd = 'owner';


  this.router.navigate(['/view-advert-modal']);
} else {
  this.ViewedAd = 'owner';

  this.AdnotFound('you have no baker advert in data base', 'Baker');

}


}

OwnerShopListing(Uid: string) {
  this.ReturnedShop = this.ShopsListing.find(result => result.uid === Uid);

  if (this.ReturnedShop) {
  console.log('returned shop: ', this.ReturnedShop);
  this.viewedAdtype = 2;
  this.ViewedAd = 'owner';


  this.router.navigate(['/view-advert-modal']);
  } else {
    this.ViewedAd = 'owner';

    this.AdnotFound('you have no shop advert in database', 'Shop');

  }

}

OwnerJobListing(Uid: string) {

  this.ReturnedJob = this.BakingJobs.find(result => result.uid === Uid);

  if (this.ReturnedJob) {
  console.log('returned Job:', this.ReturnedJob);
  this.ViewedAd = 'owner';
  this.viewedAdtype = 3;
  this.router.navigate(['/view-advert-modal']);
  } else {
  this.ViewedAd = 'owner';

  this.AdnotFound('you have no job advert in database', 'Job');

  }

}


async AdnotFound(sentmessage: string, adcreate: string) {
  const alert = await this.alertctrl.create({
    header: 'Ad not found',
    message: sentmessage,
    backdropDismiss: false,
    buttons: [
      {
        text: 'cancel',
        role: 'cancel',
        cssClass: 'background:black'
      },

      {
        text: 'Create Ad',
        handler: () => {
          this.EditAd = adcreate;
          this.router.navigate(['/advert-creation-modal']);

        }
      }
    ]

  });

  alert.present();
}

//#endregion



}
