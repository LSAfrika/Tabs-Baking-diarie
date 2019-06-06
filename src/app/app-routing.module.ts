import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'my-recipes', loadChildren: './my-recipes/my-recipes.module#MyRecipesPageModule' },
  { path: 'recepieview/:id', loadChildren: './recepieview/recepieview.module#RecepieviewPageModule' },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
