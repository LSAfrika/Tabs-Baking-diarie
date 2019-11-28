import { AlertController } from "@ionic/angular";
import { FireBaseManagerservice } from "./../../services/FireBaseManager.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-view-advert-modal",
  templateUrl: "./view-advert-modal.page.html",
  styleUrls: ["./view-advert-modal.page.scss"]
})
export class ViewAdvertModalPage implements OnInit, OnDestroy {
  viewedAdtype = 0;
  Label = "view contact(s)";
  contactview = false;

  images: any[] = [];

  constructor(
    public FireBaseManager: FireBaseManagerservice,
    private router: Router,
    private alertctrl: AlertController
  ) {
    this.images = [
      { image: "/assets/cakes/apple.jpg" },
      { image: "/assets/cakes/cake.jpg" },
      { image: "/assets/cakes/chocolate.jpg" },
      { image: "/assets/cakes/cinnamon.jpg" }
    ];
  }

  ngOnInit() {
    console.log("integer", this.FireBaseManager.viewedAdtype);
    this.contactview = false;
  }

  ngOnDestroy() {
    this.contactview = false;
  }

  ViewContact() {
    if (this.FireBaseManager.FacebookloginState === true) {
      this.contactview = true;
    } else {
      this.LoginAlert();
    }
  }

  navigateback() {
    if (this.FireBaseManager.ViewedAd === "anonymous") {
      this.contactview = false;

      this.router.navigate(["/tabs/tab2"]);
    } else if (this.FireBaseManager.ViewedAd === "owner") {
      this.contactview = false;

      this.router.navigate(["/tabs/tab4"]);
    }
  }

  EditAd() {
    if (this.FireBaseManager.viewedAdtype === 1) {
      this.FireBaseManager.EditAd = "Baker";
      this.FireBaseManager.UpdateAd = true;
      this.router.navigate(["/advert-creation-modal"]);
    } else if (this.FireBaseManager.viewedAdtype === 2) {
      this.FireBaseManager.EditAd = "Shop";
      this.FireBaseManager.UpdateAd = true;
      this.router.navigate(["/advert-creation-modal"]);
    } else if (this.FireBaseManager.viewedAdtype === 3) {
      this.FireBaseManager.EditAd = "Job";
      this.FireBaseManager.UpdateAd = true;
      this.router.navigate(["/advert-creation-modal"]);
    }
  }

  async LoginAlert() {
    const alertFb = await this.alertctrl.create({
      message: "please sign <strong>in / up</strong> to view contacts ",

      buttons: [
        {
          text: "sign in/up",
          handler: () => {
            this.FireBaseManager.facebooklogin();
            this.alertctrl.dismiss();
          }
        },
        {
          text: "close",
          role: "cancel"
        }
      ]
    });
    alertFb.present();
  }
}
