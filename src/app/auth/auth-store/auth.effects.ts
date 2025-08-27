import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  authenticateFail,
  authenticateSuccess,
  startSignup,
  startLogin,
  logoutUser,
  autoLogin,
} from './auth.actions';
import { environment } from '../../../environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return authenticateSuccess({ value: user });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(authenticateFail({ errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMessage = 'Invalid credentials.';
      break;
  }
  return of(authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  authAutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
          return { type: 'Not valid' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return authenticateSuccess({ value: loadedUser });
        }
        return { type: 'Not valid' };
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FirebaseAPIKey}`,
            {
              email: authData.value.email,
              password: authData.value.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => handleAuthentication(resData)),
            catchError((errorRes) => handleError(errorRes))
          );
      })
    )
  );

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(startSignup),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FirebaseAPIKey}`,
            {
              email: authData.value.email,
              password: authData.value.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => handleAuthentication(resData)),
            catchError((errorRes) => handleError(errorRes))
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUser),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
