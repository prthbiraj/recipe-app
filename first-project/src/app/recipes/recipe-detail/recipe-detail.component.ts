import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingListService } from 'src/app/shared/services/shoppinglist.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  
  constructor(private shoppingService: ShoppingListService,
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (param) => {
        this.recipe = this.recipeService.getRecipeById(param['id']);       
      }
    )
  }

  addToShopping(ingrds: Ingredient[]) {
    ingrds.forEach(ingr => {
      this.shoppingService.addIngredient(ingr);
    });
      
  }

  onDelete() {    
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }
}
