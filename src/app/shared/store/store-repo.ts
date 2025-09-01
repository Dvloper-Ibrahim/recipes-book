import { ActionReducerMap } from '@ngrx/store';

import { Ingredient } from '../ingredient.model';
import { User } from '../../auth/user.model';
import { shoppingListReducer } from '../../shopping-list/shopping-list-store/shopping-list.reducer';
import { authReducer } from '../../auth/auth-store/auth.reducer';
import { Recipe } from '../../recipes/recipe.model';
import { recipesReducer } from '../../recipes/recipes-store/recipes.reducer';

export type ShoppingListState = {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
};

export type AuthState = {
  user: User | null;
  authError: string | null;
  loading: boolean;
};

export type RecipesState = {
  recipes: Recipe[];
};

export type StoreState = {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipesState;
};

export const appReducers: ActionReducerMap<StoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer,
};
