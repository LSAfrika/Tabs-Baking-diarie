import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewAdvertModalPage } from './view-advert-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAdvertModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewAdvertModalPage]
})
export class ViewAdvertModalPageModule {}
