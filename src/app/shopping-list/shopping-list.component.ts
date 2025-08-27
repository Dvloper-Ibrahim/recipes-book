import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoggingService } from '../logging.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { StoreState } from '../shared/store/store-repo';
import { selectIngredients } from './shopping-list-store/shopping-list.selector';
import { Ingredient } from '../shared/ingredient.model';
import { startEditingIngredient } from './shopping-list-store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Observable<Ingredient[]>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<StoreState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select(selectIngredients);
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(itemIndex: number) {
    this.store.dispatch(startEditingIngredient({ index: itemIndex }));
  }
}
