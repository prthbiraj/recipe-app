import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const route:Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  {path:'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  {path:'shoppinglist', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route, {preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
