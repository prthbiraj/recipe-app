import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }
  
  
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();  
    
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {        
        this.recipes = recipes;
      }
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
}
