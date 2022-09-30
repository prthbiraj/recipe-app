import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "../model/ingredient.model";

@Injectable({providedIn:'root'})
export class RecipeService {

    selectedRecipe = new Subject<Recipe>();

    recipeChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    public getRecipes() {       
        return this.recipes.slice();
    }

    public getRecipeById(id:number): Recipe {        
        return this.recipes.find(rec => rec.id == id);
    }

    public addRecipe(recipe:Recipe) {      
        recipe.id = this.recipes.length;
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    public updateRecipe(id:number, recipe:Recipe) {         
        recipe.id = id;         
        this.recipes[id] = recipe;
        this.recipeChanged.next(this.recipes.slice());       
    }

    public deleteRecipe(id:number) {
        if(this.recipes.length === 1) {
            this.recipes.splice(0, 1); 
            this.recipeChanged.next(this.recipes.slice());
        } else {
            this.recipes.splice(id, 1); 
            this.recipeChanged.next(this.recipes.slice());
        }
        
    }

    public setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
}