import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdersCreationModalPage]
})
export class OrdersCreationModalPageModule {}
