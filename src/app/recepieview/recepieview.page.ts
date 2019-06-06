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

  IsActive = true;
  Tab1 = false;
  Tab2 = true;
  RecipeView:RecepieInterface;

  constructor(private modal: ModalController,public GService:GlobalServiceService) { }

  ngOnInit() {
    this.RecipeView=this.GService.ViewRecipie;

  }

  dismissModal() {
    this.modal.dismiss();
  }

  StateToggler(state: boolean ) {
    if (state) {
     this. Tab1 = false;
     this. Tab2 = true;
     this. IsActive = true;

    } else {
      this. Tab1 = true;
      this. Tab2 = false;
      this. IsActive = false;

    }

  }

}
