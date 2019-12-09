import { FireBaseManagerservice } from './../services/FireBaseManager.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalServiceService } from '../services/global-service.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {

  constructor(public GService: GlobalServiceService, private firebasemanager: FireBaseManagerservice) {
    // this.plt.backButton().sub ;
  }





  IsActive = true;
  Tab1 = false;
  Tab2 = true;






  ngOnInit() {

  }
  ngAfterViewInit() {
    console.log('view did load');


  }

  ionViewWillEnter() {
    this.Tab1 = false;
    this.Tab2 = true;
    this.IsActive = true;

    this.firebasemanager.InitialLoading.next(true);


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

  }



  ViewRecepie(title: string, state: boolean) {
    this.GService.loadSpecificRecipe(title);
    this.GService.personalState = state;

  }
  ViewPersonalRecepie(date: Date, state: boolean) {
    this.GService.loadSpecificPersonalRecipe(date);
    this.GService.personalState = state;
    this.EditPersonalRecepie(state);
  }

  EditPersonalRecepie(isEditable: boolean) {
    this.GService.isRecipeEditable = isEditable;
    //  this.GService.loadSpecificPersonalRecipe(title);

  }


}
