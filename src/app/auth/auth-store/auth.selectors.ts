import { StoreState } from 'src/app/shared/store/store-repo';

export const selectAuthState = (state: StoreState) => state.auth;
