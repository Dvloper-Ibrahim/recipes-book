import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction(
  '[ShoppingList] Add_Ingredient',
  props<{ value: Ingredient }>()
);

export const addIngredients = createAction(
  '[ShoppingList] Add_Ingredients',
  props<{ value: Ingredient[] }>()
);

export const startEditingIngredient = createAction(
  '[ShoppingList] Start_Editing_Ingredient',
  props<{ index: number }>()
);

export const stopEditingIngredient = createAction(
  '[ShoppingList] Stop_Editing_Ingredient'
);

export const updateIngredient = createAction(
  '[ShoppingList] Update_Ingredient',
  props<{ value: Ingredient }>()
);

export const deleteIngredient = createAction(
  '[ShoppingList] Delete_Ingredient'
);

