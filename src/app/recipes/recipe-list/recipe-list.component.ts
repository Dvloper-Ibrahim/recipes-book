import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { selectRecipesState } from '../recipes-store/recipes.selectors';
import { StoreState } from '../../shared/store/store-repo';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<StoreState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(selectRecipesState)
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
