import { StoreState } from 'src/app/shared/store/store-repo';

export const selectRecipesState = (state: StoreState) => state.recipes;
