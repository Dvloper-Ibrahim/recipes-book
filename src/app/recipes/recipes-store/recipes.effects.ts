import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { fetchRecipes, setRecipes, storeRecipes } from './recipes.actions';
import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';
import { selectRecipesState } from './recipes.selectors';
import { of } from 'rxjs';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {}

  fetchRecipesOnReload = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          `${environment.fireBaseAPIUrl}/recipes.json`
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return setRecipes({ value: recipes });
      })
    )
  );

  storeRecipesInServer = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select(selectRecipesState)),
        switchMap(([action, state]) => {
          return this.http
            .put(`${environment.fireBaseAPIUrl}/recipes.json`, state.recipes)
            .pipe(
              map(() => ({ type: '[Recipes] Store Recipes Success' })),
              catchError((error) =>
                of({ type: '[Recipes] Store Recipes Failure', error })
              )
            );
        })
      ),
    { dispatch: false }
  );
}
