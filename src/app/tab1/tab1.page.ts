import { ModalControllerService } from './../services/modal-controller.service';
import { Component, OnInit,  } from '@angular/core';



import { GlobalServiceService } from '../services/global-service.service';
import { IonContent, IonHeader } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(  public GService: GlobalServiceService, public modalctrl: ModalControllerService) {
   // this.plt.backButton().sub ;
  }





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


 

NewRecipeForm(isEditable: boolean) {
  this.GService.isRecipeEditable = isEditable;
  this.modalctrl.createForm();
}



  ViewRecepie(title: string, state: boolean) {
    this.GService.loadSpecificRecipe(title);
    this.GService.Ispersonalrecepie(state);
    this.modalctrl.PresentRecepieModal();
  }
  ViewPersonalRecepie(title: string, state: boolean) {
    this.GService.loadSpecificPersonalRecipe(title);
    this.GService.Ispersonalrecepie(state);
    this.modalctrl.PresentRecepieModal();
  }

  EditPersonalRecepie(title: string, isEditable: boolean) {
    this.GService.isRecipeEditable=isEditable;
    this.GService.loadSpecificPersonalRecipe(title);
    this.modalctrl.createForm();
  }
 

}
