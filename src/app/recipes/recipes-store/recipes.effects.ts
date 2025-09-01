import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { fetchRecipes, setRecipes, storeRecipes } from './recipes.actions';
import { environment } from '../../../environments/environment';
import { Recipe } from '../recipe.model';
import { selectRecipesState } from './recipes.selectors';
import { StoreState } from '../../shared/store/store-repo';

@Injectable()
export class RecipesEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreState>);

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
      }),
      catchError((error) => of({ type: 'Error in fetching recipes: ' + error }))
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

  constructor(private http: HttpClient) {}
}
