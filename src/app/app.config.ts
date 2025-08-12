import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/shopping-list-store/shopping-list.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(CoreModule),
    provideStore({
      shoppingList: shoppingListReducer,
    }),
  ],
};
