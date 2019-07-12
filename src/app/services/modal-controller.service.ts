import { Injectable } from '@angular/core';
import { MyRecipesPage } from './../my-recipes/my-recipes.page';
import { RecepieviewPage } from './../recepieview/recepieview.page';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  constructor(private FormModal: ModalController) { }



  async createForm() {
    const newrecepie = await this.FormModal.create({
      component: MyRecipesPage,
      backdropDismiss: false,

    });
    await newrecepie.present();
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
