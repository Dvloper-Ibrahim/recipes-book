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
import { StoreState } from '../shared/store/store-repo';
import { fetchRecipes, setRecipes } from './recipes-store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<StoreState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectRecipesState).pipe(
      map((recipesState) => {
        if (recipesState.recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
        }
        return recipesState.recipes;
      })
    );

    // Solutioon that maximilian took in his course (something wrong with it)
    // this.store.dispatch(fetchRecipes());
    // return (this.actions$.pipe(ofType(setRecipes), take(1)));
  }
}
