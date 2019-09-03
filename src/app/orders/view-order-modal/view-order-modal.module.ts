import { PopoverComponent } from './../../PopOverfolder/popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewOrderModalPage } from './view-order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOrderModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [PopoverComponent]
  ,
  declarations: [ViewOrderModalPage, PopoverComponent]
})
export class ViewOrderModalPageModule {}
