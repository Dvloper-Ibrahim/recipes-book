import { Ingredient } from 'src/app/shared/ingredient.model';

export type ShoppingListState = {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

export type StoreState = {
  shoppingList: ShoppingListState;
};
