import { createAction, props } from "@ngrx/store";

import { User } from "../user.model";

export const autoLogin = createAction(
  "[Auth] Auto_Login",
)

export const startLogin = createAction(
  "[Auth] Start_Login",
  props<{ value : { email: string, password: string } }>()
)

export const authenticateSuccess = createAction(
  '[Auth] Authenticate_Login_User',
  props<{ value: User }>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate_Login_Fail',
  props<{ errorMessage: string }>()
);

export const logoutUser = createAction(
  '[Auth] Logout_User'
);

export const startSignup = createAction(
  '[Auth] Start_Signup',
  props<{ value : { email: string, password: string } }>()
);

export const clearAuthError = createAction(
  '[Auth] Clear_Auth_Error',
);
