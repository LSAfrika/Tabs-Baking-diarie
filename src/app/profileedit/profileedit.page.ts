import { LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
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

  constructor(public FireBaseManager: FireBaseManagerservice, private loadingctrl: LoadingController) {
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

    this.Photouploadctrl();
    console.log(event.target.files[0]);
    const pic = event.target.files[0];
    this.FireBaseManager.uploadprofilepicture(pic, this.loadingctrl);
  }

  async Photouploadctrl() {
    const upload = await this.loadingctrl.create({
      spinner: 'bubbles',
      message: 'uploading profile image',
      translucent: true
    });
    await upload.present();



  }


}
