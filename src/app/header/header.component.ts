import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';
import { Store } from '@ngrx/store';
import { StoreState } from '../shared/store/store-repo';
import { selectAuthState } from '../auth/auth-store/auth.selector';
import { logoutUser } from '../auth/auth-store/auth.actions';

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
    private dataStorageService: DataStorageService,
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
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(logoutUser());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
