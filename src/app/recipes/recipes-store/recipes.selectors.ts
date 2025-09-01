import { StoreState } from "../../shared/store/store-repo";

export const selectRecipesState = (state: StoreState) => state.recipes;
