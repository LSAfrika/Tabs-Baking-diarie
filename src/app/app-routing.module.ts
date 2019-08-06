import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 // { path: 'my-recipes', loadChildren: './my-recipes/my-recipes.module#MyRecipesPageModule' },
   // tslint:disable-next-line: max-line-length
   // { path: 'recepieview/:id', loadChildren: './recepieview/recepieview.module#RecepieviewPageModule' },recipe-creator.module#RecipeCreatorPageModule
   // tslint:disable-next-line: max-line-length
   // { path: 'recipeview', loadChildren: './recipeview/recipeview.module#RecipeviewPageModule' }, view-recepie-modal.module#ViewRecepieModalPageModule
  { path: 'view-recepie-modal', loadChildren: 'src/app/Recipes/view-recepie-modal/view-recepie-modal.module#ViewRecepieModalPageModule' },
  { path: 'recipe-creator', loadChildren: 'src/app/Recipes/recipe-creator/recipe-creator.module#RecipeCreatorPageModule' },
  { path: 'view-order-modal', loadChildren: './orders/view-order-modal/view-order-modal.module#ViewOrderModalPageModule' },
  { path: 'orders-creation-modal',
   loadChildren: './orders/orders-creation-modal/orders-creation-modal.module#OrdersCreationModalPageModule' },
 // { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
