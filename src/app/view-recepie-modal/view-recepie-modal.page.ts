import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../services/global-service.service';
import { RecepieInterface } from './../interfaces/recepie-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recepie-modal',
  templateUrl: './view-recepie-modal.page.html',
  styleUrls: ['./view-recepie-modal.page.scss'],
})
export class ViewRecepieModalPage implements OnInit {


  RecipeView: RecepieInterface;
  IsPersonalRecipe = false;

  constructor( public GService: GlobalServiceService, private router: Router) { }

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

}
