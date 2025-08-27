import { ActionReducerMap } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { User } from 'src/app/auth/user.model';
import { shoppingListReducer } from 'src/app/shopping-list/shopping-list-store/shopping-list.reducer';
import { authReducer } from 'src/app/auth/auth-store/auth.reducer';

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

export type StoreState = {
  shoppingList: ShoppingListState;
  auth: AuthtState;
};

export const appReducers: ActionReducerMap<StoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
