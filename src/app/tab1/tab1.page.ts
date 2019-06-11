import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MyRecipesPage } from './../my-recipes/my-recipes.page';
import { RecepieviewPage } from './../recepieview/recepieview.page';
import { ModalController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';
import { IonContent, IonHeader } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private FormModal: ModalController, public GService: GlobalServiceService) { }

 



  IsActive = true;
  Tab1 = false;
  Tab2 = true;

 




  ngOnInit() {
    this.GService.loadAppRecipies();
    this.GService.loadPersonalRecepies();

  }

  ionViewWillEnter() {
    this.Tab1 = false;
    this.Tab2 = true;
    this.IsActive = true;

  }

  StateToggler(state: boolean) {
    if (state) {
      this.Tab1 = false;
      this.Tab2 = true;
      this.IsActive = true;

    } else {
      this.Tab1 = true;
      this.Tab2 = false;
      this.IsActive = false;

    }

  }


  async createForm() {
    const newrecepie = await this.FormModal.create({
      component: MyRecipesPage,
      backdropDismiss: false,
      animated: false
    });
    await newrecepie.present();
  }


  ViewRecepie(title: string,state:boolean) {
    this.GService.loadSpecificRecipe(title);
    this.GService.Ispersonalrecepie(state);
    this.PresentRecepieModal();
  }
  ViewPersonalRecepie(title: string,state:boolean) {
    this.GService.loadSpecificPersonalRecipe(title);
    this.GService.Ispersonalrecepie(state);
    this.PresentRecepieModal();
  }

  async PresentRecepieModal() {

    const View = await this.FormModal.create({
      component: RecepieviewPage,
      backdropDismiss: false,
      animated: false

    });
    await View.present();
  }

}
