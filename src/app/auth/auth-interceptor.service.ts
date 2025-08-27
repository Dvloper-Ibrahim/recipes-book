import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { selectAuthState } from './auth-store/auth.selector';
import { StoreState } from '../shared/store/store-repo';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<StoreState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(selectAuthState).pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token as string),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
