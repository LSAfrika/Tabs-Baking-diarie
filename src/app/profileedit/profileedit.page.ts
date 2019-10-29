import { LoadingController, AlertController } from '@ionic/angular';

import { UserInterface } from './../interfaces/user.interface';
import { FireBaseManagerservice } from './../services/FireBaseManager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.page.html',
  styleUrls: ['./profileedit.page.scss'],
})
export class ProfileeditPage implements OnInit {

  Userbio: UserInterface;
  uploadpic: File;

  constructor(public FireBaseManager: FireBaseManagerservice, private loadingctrl: LoadingController, private alertctrl: AlertController) {
  //  this.Userbio = {} as UserInterface;
   // console.log('initial value: ', this.Userbio);

  }

  ngOnInit() {
  //  console.log('polpulated value value edit : ', this.FireBaseManager.ReturnedUser);

    this.Userbio = this.FireBaseManager.ReturnedUser;
    console.log('profile edit bio data:', this.Userbio);
    
  }



  Updateprofile() {

    const updateuser: UserInterface = {

      uid: this.Userbio.uid,
      displayName: this.Userbio.displayName,
      phone: this.Userbio.phone,
      bio: this.Userbio.bio,

    };

    this.FireBaseManager.EditUpdateProfile(updateuser);


  }

  photoupload(event) {
    console.log('user before photo update: ', this.Userbio);

    console.log(event.target.files[0]);
    const pic = event.target.files[0] ;
   
    this.uploadpic = pic;
    const extensilon  = this.uploadpic.name.substring(this.uploadpic.name.lastIndexOf('.') + 1);
    console.log('file input ', extensilon);

    if ( extensilon === 'jpg' || extensilon === 'jpeg' || extensilon === 'png') {
    this.Photouploadctrl();
    this.FireBaseManager.uploadprofilepicture(pic, this.loadingctrl);


    } else {
     this.WrongfileUpload();

    }

  }

  async Photouploadctrl() {
    const upload = await this.loadingctrl.create({
      spinner: 'bubbles',
      message: 'uploading profile image',
      translucent: true
    });
    await upload.present();



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
