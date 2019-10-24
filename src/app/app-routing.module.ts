import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
    loadChildren: './tabs/tabs.module#TabsPageModule' },

  { path: 'view-recepie-modal',
   loadChildren: 'src/app/Recipes/view-recepie-modal/view-recepie-modal.module#ViewRecepieModalPageModule' },

  { path: 'recipe-creator',
    loadChildren: 'src/app/Recipes/recipe-creator/recipe-creator.module#RecipeCreatorPageModule' },

  { path: 'view-order-modal',
    loadChildren: './orders/view-order-modal/view-order-modal.module#ViewOrderModalPageModule' },

  { path: 'orders-creation-modal',
    loadChildren: './orders/orders-creation-modal/orders-creation-modal.module#OrdersCreationModalPageModule' },

  { path: 'view-advert-modal',
    loadChildren: './Ads/view-advert-modal/view-advert-modal.module#ViewAdvertModalPageModule' },

  { path: 'advert-creation-modal',
    loadChildren: './Ads/advert-creation-modal/advert-creation-modal.module#AdvertCreationModalPageModule' },

  { path: 'profileedit',
   loadChildren: './profileedit/profileedit.module#ProfileeditPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
