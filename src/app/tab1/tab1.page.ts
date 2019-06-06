import { Component, OnInit } from '@angular/core';
import { MyRecipesPage } from './../my-recipes/my-recipes.page';
import {RecepieviewPage} from './../recepieview/recepieview.page';
import { ModalController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private FormModal: ModalController,public GService:GlobalServiceService ) {}

  IsActive=true;
  Tab1=false;
  Tab2=true;
  vanilla='vanilla cake'

  ngOnInit() {
 this.GService.loadAppRecipies();

  }

  ionViewWillEnter(){
    this. Tab1=false;
    this. Tab2=true;
   this. IsActive=true;
   
  }

  StateToggler(state: boolean )
  {
    if(state){
     this. Tab1=false;
     this. Tab2=true;
     this. IsActive=true;

    }
    
    else{
      this. Tab1=true;
      this. Tab2=false;
      this. IsActive=false;

    }
   
  }


  async createForm()
  {
    const newrecepie = await this.FormModal.create({
      component:MyRecipesPage,
      backdropDismiss:false,

    });
    await newrecepie.present();
  }


  ViewRecepie(title:string )
  {
    this.GService.loadSpecificRecipe(title);
    this.PresentRecepieModal();
  }


  async PresentRecepieModal()
  {

    const View = await this.FormModal.create({
      component:RecepieviewPage,
      backdropDismiss:false,

    });
    await View.present();
  }
  
}
