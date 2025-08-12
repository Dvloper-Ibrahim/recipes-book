import { createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient, addIngredients, deleteIngredient, startEditingIngredient, stopEditingIngredient, updateIngredient } from './shopping-list.actions';
import { ShoppingListState } from '../../shared/store/store.types';

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.value]
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.value]
  })),
  on(startEditingIngredient, (state, action) => ({
    ...state,
    editedIngredientIndex: action.index,
    editedIngredient: {...state.ingredients[action.index]}
  })),
  on(stopEditingIngredient, (state) => ({
    ...state,
    editedIngredientIndex: -1,
    editedIngredient: null
  })),
  on(updateIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.map((ing, ingIndex) => 
      ingIndex === state.editedIngredientIndex ? action.value : ing),
    editedIngredientIndex: -1,
    editedIngredient: null
  })),
  on(deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ing, ingIndex) => ingIndex !== state.editedIngredientIndex),
    editedIngredientIndex: -1,
    editedIngredient: null
  }))
);
