import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecepieviewPage } from './recepieview.page';
import { SharedModule } from '../mymodules/shared/shared.module';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';


const routes: Routes = [
  {
    path: '',
    component: RecepieviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   SharedModule,
    IonicModule,
    IonicHeaderParallaxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecepieviewPage]
})
export class RecepieviewPageModule {}
