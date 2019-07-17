import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'my-recipes', loadChildren: './my-recipes/my-recipes.module#MyRecipesPageModule' },
  { path: 'recepieview/:id', loadChildren: './recepieview/recepieview.module#RecepieviewPageModule' },
  //{ path: 'recipeview', loadChildren: './recipeview/recipeview.module#RecipeviewPageModule' },
  { path: 'view-recepie-modal', loadChildren: './view-recepie-modal/view-recepie-modal.module#ViewRecepieModalPageModule' },
  { path: 'recipe-creator', loadChildren: './recipe-creator/recipe-creator.module#RecipeCreatorPageModule' },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
