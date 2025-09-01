import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { DropdownDirective } from '../shared/dropdown.directive';
import { StoreState } from '../shared/store/store-repo';
import { selectAuthState } from '../auth/auth-store/auth.selectors';
import { logoutUser } from '../auth/auth-store/auth.actions';
import {
  fetchRecipes,
  storeRecipes,
} from '../recipes/recipes-store/recipes.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DropdownDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(
    private store: Store<StoreState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select(selectAuthState)
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
