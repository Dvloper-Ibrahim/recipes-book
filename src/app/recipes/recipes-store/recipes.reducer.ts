import { createReducer, on } from '@ngrx/store';
import { RecipesState } from 'src/app/shared/store/store-repo';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipes.actions';

const initialRecipesState: RecipesState = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialRecipesState,
  on(setRecipes, (state, action) => ({
    ...state,
    recipes: [...action.value],
  })),
  on(addRecipe, (state, action) => ({
    ...state,
    recipes: [...state.recipes, action.value],
  })),
  on(updateRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.map((recipe, i) =>
      i === action.index ? {...action.value} : recipe
    ),
  })),
  on(deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((recipe, i) => i !== action.index),
  }))
);
