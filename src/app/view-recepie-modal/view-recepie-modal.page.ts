import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../services/global-service.service';
import { RecepieInterface } from './../interfaces/recepie-interface';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-recepie-modal',
  templateUrl: './view-recepie-modal.page.html',
  styleUrls: ['./view-recepie-modal.page.scss'],
})
export class ViewRecepieModalPage implements OnInit {


  RecipeView: RecepieInterface;
  IsPersonalRecipe = false;

  constructor( public GService: GlobalServiceService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.RecipeView = this.GService.ViewRecipie;
    this.IsPersonalRecipe = this.GService.personalState;


    console.log(this.IsPersonalRecipe);

  }

  dismissView() {
    this.router.navigate (['/tabs/tab1']);

  }

  EditPersonalRecepie( isEditable: boolean) {
    this.GService.isRecipeEditable = isEditable;
  //  this.GService.loadSpecificPersonalRecipe(title);

  }

  DeleteRecipe() {

    this.DeleteNotifier();
  }

  async DeleteNotifier() {
    const alert = await this.alertController.create({
      header: `DELETE RECIPE`,
      message: `are you sure you want to delete <strong> ${this.RecipeView.title}</strong>`,
      backdropDismiss: false,
      buttons: [

        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.GService.DeletePersonalRecepies();
          }
        }
      ]
    });

    await alert.present();
  }



}
