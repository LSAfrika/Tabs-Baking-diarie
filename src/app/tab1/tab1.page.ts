import { Component } from '@angular/core';
import { MyRecipesPage } from './../my-recipes/my-recipes.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private FormModal:ModalController){}

  IsActive=true;
  Tab1=false;
  Tab2=true;
  vanilla='vanilla cake'

  StateToggler(state:boolean)
  {
    if(state){
     this. Tab1=false;
     this. Tab2=true;

    }
    
    else{
      this. Tab1=true;
      this. Tab2=false;

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
  
}
