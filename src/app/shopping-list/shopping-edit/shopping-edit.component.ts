import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  deleteIngredient,
  stopEditingIngredient,
  updateIngredient,
} from '../shopping-list-store/shopping-list.actions';
import { selectShoppingList } from '../shopping-list-store/shopping-list.selector';
import { StoreState } from '../../shared/store/store-repo';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;

  constructor(private store: Store<StoreState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select(selectShoppingList)
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient as Ingredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient({ value: newIngredient }));
    } else {
      this.store.dispatch(addIngredient({ value: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(stopEditingIngredient());
  }

  onDelete() {
    this.store.dispatch(deleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEditingIngredient());
  }
}
