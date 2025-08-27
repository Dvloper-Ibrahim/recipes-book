import { StoreState } from '../../shared/store/store-repo';

export const selectAuthState = (state: StoreState) => state.auth;
