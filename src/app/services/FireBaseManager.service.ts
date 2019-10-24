import { UserInterface } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, first} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { BakingJobInterface } from '../interfaces/BakingJob.interace';
import { BakersInterface } from '../interfaces/BakerListing.interface';
import { ShopsListingInterface } from '../interfaces/ShopsListing.interface';
import { Router } from '@angular/router';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


// import * as EmptyObservable from 'rxjs/observable/EmptyObservable';
// import {of} from 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class FireBaseManagerservice {

  // todo TEXT LINKING to splash UI \\
  Buttontext = 'skip';
  Alerttext = 'continue without signing in ?';

  // todo Hide ui\\
  HideButton = false;

  behaiourIsLogged: BehaviorSubject<boolean>;
  Spinner: BehaviorSubject<boolean>;
  storeimagelink: BehaviorSubject<string>;

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

  constructor(private afs: AngularFirestore,
              private router: Router,
              private fireAuth: AngularFireAuth,
              private platform: Platform,
              private fb: Facebook,
              private alertctrl: AlertController, 
              private AFStorage: AngularFireStorage,) {

    this.JobsListingFireStore();
    this.BakersListingFireStore();
    this.ShopsListingFireStore();


    this.behaiourIsLogged = new BehaviorSubject(false);
    this.Spinner = new BehaviorSubject(true);
    this.storeimagelink = new BehaviorSubject('');

   }




   SubscriptionOutput() {

    this.behaiourIsLogged.subscribe(state => {


      console.log('bool value in subject: ', state);




     });



  }



  SpinnerSubscriptionOutput() {

    this.Spinner.subscribe(state => {


      console.log('bool value in subject: ', state);




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
    this.HideButton = true;
    this.Buttontext = 'continue';
    this.Alerttext = '';


    this.UserListingFirestore(user.uid);
    this.Spinner.next(false);



  //  console.log ('user credentials: ', user);
  } else {

    this.behaiourIsLogged.next(false);
    this.Spinner.next(false);

    this.Buttontext = 'skip';
    this.HideButton = false;
    this.Alerttext = 'continue without signing in ?';

   
    this.UserListingFirestore('no user');

    console.log ('user not logged in ');
 }

}

UserListingFirestore(Uid: string) {
  this.User = this.afs.doc(`Users/${Uid}`);

  if (this.User) {
  this.UserObservable = this.User.valueChanges();

  this.UserObservable.subscribe((user: UserInterface) => {
    this.ReturnedUser = user;
    console.log('polpulated value value: ', user);

  });


  } else {

    
  //  const emptyObservable = observable. of(null);
    // this.UserObservable = //new EmptyObservable<UserInterface>();
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
      this.HideButton = true;
      this.SplashScreen = false;
      this.CheckLogin();
      console.log('splash screen status: ', this.SplashScreen);


    }).catch(err => {
      console.log(err);

    });


  }


}

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
  const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
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

uploadprofilepicture(pic: File, loading: LoadingController) {

 
  const filePath = `Users/${this.ReturnedUser.uid}/profile/profilepicture`;
  const ref = this.AFStorage.ref(filePath);

  ref.put(pic).then(() => {
    ref.getDownloadURL().subscribe(imgLink => {

       const imagedata: UserInterface = {
         displayName: this.ReturnedUser.displayName,
         bio: this.ReturnedUser.bio,
         phone: this.ReturnedUser.phone,
         photoURL: imgLink,
         uid: this.ReturnedUser.uid
       };


       this.uploadphoto(imagedata);
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

uploadphoto( data: UserInterface) {
  this.User.set (data, {merge: true}).then((result) => {
    console.log('saved succesfully ');
  });
  this.Profileuploadnotifier();

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

  if(this.ReturnedBaker) {
  console.log('returned Baker: ', this.ReturnedBaker);
  this.router.navigate(['/view-advert-modal']);
}


}

viewShopListing(index: number) {
  this.ReturnedShop = this.ShopsListing[index];

  if (this.ReturnedShop) {
  console.log('returned shop: ', this.ReturnedShop);
  this.router.navigate(['/view-advert-modal']);
  }

}

viewJobListing(index: number) {

  this.ReturnedJob = this.BakingJobs[index];

  if (this.ReturnedJob) {
  console.log('returned Job:', this.ReturnedJob);
  this.router.navigate(['/view-advert-modal']);
  }

}


// specific user document



//#endregion



}
