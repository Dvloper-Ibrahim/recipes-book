import { ActionReducerMap } from '@ngrx/store';

import { Ingredient } from '../ingredient.model';
import { User } from '../../auth/user.model';
import { shoppingListReducer } from '../../shopping-list/shopping-list-store/shopping-list.reducer';
import { authReducer } from '../../auth/auth-store/auth.reducer';

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

export type StoreState = {
  shoppingList: ShoppingListState;
  auth: AuthState;
};

export const appReducers: ActionReducerMap<StoreState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
