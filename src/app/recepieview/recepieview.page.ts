import { RecepieInterface } from './../interfaces/recepie-interface';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-recepieview',
  templateUrl: './recepieview.page.html',
  styleUrls: ['./recepieview.page.scss'],
})
export class RecepieviewPage implements OnInit {

  
  RecipeView: RecepieInterface;
  IsPersonalRecipe= false;

  constructor(private modal: ModalController,public GService:GlobalServiceService) { }

  ngOnInit() {
    this.RecipeView=this.GService.ViewRecipie;
    this.IsPersonalRecipe = this.GService.personalState;

    console.log(this.IsPersonalRecipe);

  }

  dismissModal() {
    this.modal.dismiss();
  }

 

}
