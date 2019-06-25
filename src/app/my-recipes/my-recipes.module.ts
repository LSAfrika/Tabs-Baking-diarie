import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';



import { IonicModule } from '@ionic/angular';

import { MyRecipesPage } from './my-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: MyRecipesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [MyRecipesPage]
})
export class MyRecipesPageModule {}
