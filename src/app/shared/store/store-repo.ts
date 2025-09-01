import { ActionReducerMap } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { User } from 'src/app/auth/user.model';
import { shoppingListReducer } from 'src/app/shopping-list/shopping-list-store/shopping-list.reducer';
import { authReducer } from 'src/app/auth/auth-store/auth.reducer';
import { Recipe } from 'src/app/recipes/recipe.model';
import { recipesReducer } from 'src/app/recipes/recipes-store/recipes.reducer';

export type ShoppingListState = {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

export type AuthtState = {
  user: User;
  authError: string;
  loading: boolean;
};

export type RecipesState = {
  recipes: Recipe[];
};

export type StoreState = {
  shoppingList: ShoppingListState;
  auth: AuthtState;
  recipes: RecipesState;
};

export const appReducers: ActionReducerMap<StoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer,
};
