import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../services/global-service.service';
import { RecepieInterface } from './../../interfaces/recepie-interface';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-view-recepie-modal',
  templateUrl: './view-recepie-modal.page.html',
  styleUrls: ['./view-recepie-modal.page.scss'],
})
export class ViewRecepieModalPage implements OnInit {


  RecipeView: RecepieInterface;
  IsPersonalRecipe = false;

  constructor( public GService: GlobalServiceService, 
               private router: Router, 
               private alertController: AlertController,
               private ASheet: ActionSheetController) { }

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
    this.router.navigate (['/recipe-creator']);
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
          text: 'Yes',
          handler: () => {
            this.GService.DeletePersonalRecepies();
          }
        }
      ]
    });

    await alert.present();
  }



  async OpenActionSheet() {
    const options = await this.ASheet.create({

      header: 'Edit / Delete recipe',
      buttons: [{
        text: 'edit recipe',
        icon: 'create',
        handler: () => {
          this.EditPersonalRecepie(true);
        }
      },
      {
        text: 'Delete Recipe',
        icon: 'trash',
        handler: () => {
          this.DeleteNotifier();
        }
      },
      {
        icon: 'close-circle',
        text: 'Cancel',
        role: 'cancel'
      }
      ]

    });

    await options.present();

  }


}
