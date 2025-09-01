import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const setRecipes = createAction(
  '[Recipes] Set_Recipes',
  props<{ value: Recipe[] }>()
);

export const fetchRecipes = createAction(
  '[Recipes] Fetch_Recipes'
);

export const addRecipe = createAction(
  '[Recipes] Add_Recipe',
  props<{ value: Recipe }>()
);

export const updateRecipe = createAction(
  '[Recipes] Update_Recipe',
  props<{ index: number; value: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipes] Delete_Recipe',
  props<{ index: number }>()
);

export const storeRecipes = createAction(
  '[Recipes] Store_Recipe'
);
