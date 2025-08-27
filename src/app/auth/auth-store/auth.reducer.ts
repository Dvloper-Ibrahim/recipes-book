import { createReducer, on } from '@ngrx/store';
import { AuthtState } from 'src/app/shared/store/store-repo';
import {
  authenticateFail,
  authenticateSuccess,
  clearAuthError,
  logoutUser,
  startLogin,
  startSignup,
} from './auth.actions';

const initialAuthState: AuthtState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(startLogin, startSignup, (state, action) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authenticateSuccess, (state, action) => ({
    ...state,
    user: action.value,
    loading: false,
  })),
  on(authenticateFail, (state, action) => ({
    ...state,
    authError: action.errorMessage,
    loading: false,
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: null,
  })),
  on(clearAuthError, (state) => ({
    ...state,
    authError: null,
  }))
);
