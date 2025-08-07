// import { NgModule } from '@angular/core';
// import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.routes').then((c) => c.recipesRoutes),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.routes').then(
        (c) => c.shoppingRoutes
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
  },
];
