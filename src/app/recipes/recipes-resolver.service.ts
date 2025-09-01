import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, tap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import { selectRecipesState } from './recipes-store/recipes.selectors';
import { fetchRecipes, setRecipes } from './recipes-store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectRecipesState).pipe(
      map((recipesState) => recipesState.recipes),
      tap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
        } else {
          return recipes;
        }
      })
    );

    // Solutioon that maximilian took in his course (something wrong with it)
    // this.store.dispatch(fetchRecipes());
    // return this.actions$.pipe(ofType(setRecipes), take(1));
  }
}
