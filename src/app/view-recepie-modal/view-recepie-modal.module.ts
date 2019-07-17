import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

import { IonicModule } from '@ionic/angular';

import { ViewRecepieModalPage } from './view-recepie-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRecepieModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicHeaderParallaxModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewRecepieModalPage]
})
export class ViewRecepieModalPageModule {}
