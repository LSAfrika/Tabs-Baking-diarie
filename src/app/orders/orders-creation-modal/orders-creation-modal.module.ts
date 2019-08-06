import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersCreationModalPage } from './orders-creation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersCreationModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdersCreationModalPage]
})
export class OrdersCreationModalPageModule {}
