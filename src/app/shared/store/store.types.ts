import { Ingredient } from '../../shared/ingredient.model';

export type ShoppingListState = {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
};

export type StoreState = {
  shoppingList: ShoppingListState;
};
