import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { appReducers } from './shared/store/store-repo';
import { AuthEffects } from './auth/auth-store/auth.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    // StoreModule.forRoot({
    //   shoppingList: shoppingListReducer,
    //   auth: authReducer
    // }),
    SharedModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  // providers: [
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
