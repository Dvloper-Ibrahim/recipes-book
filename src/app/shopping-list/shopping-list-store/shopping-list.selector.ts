import { createSelector } from '@ngrx/store';

import { StoreState } from 'src/app/shared/store/store-repo';

export const selectShoppingList = (state: StoreState) => state.shoppingList;

export const selectIngredients = createSelector(
  selectShoppingList,
  (state) => state.ingredients
);
