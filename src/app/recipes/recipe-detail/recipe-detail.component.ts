import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { addIngredients } from 'src/app/shopping-list/shopping-list-store/shopping-list.actions';
import { selectRecipesState } from '../recipes-store/recipes.selectors';
import { deleteRecipe } from '../recipes-store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select(selectRecipesState);
        }),
        map((recipesState) => recipesState.recipes[this.id])
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });

    // Another solution to chain observables
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.store.select(selectRecipesState).pipe(
    //     map(recipesState => recipesState.recipes[this.id])
    //   ).subscribe(recipe => {
    //     this.recipe = recipe
    //   })
    // });
  }

  onAddToShoppingList() {
    this.store.dispatch(addIngredients({ value: this.recipe.ingredients }));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
