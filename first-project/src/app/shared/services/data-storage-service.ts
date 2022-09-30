import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from "./recipe.service";
import { Recipe } from "src/app/recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService,
        private authService: AuthService) {

    }

    storeRecipes() {
        console.log("Recipes need to save ", this.recipeService.getRecipes());
        if (this.recipeService.getRecipes().length !== 0) {
            return this.httpClient.put('https://app-recipe-86f47-default-rtdb.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()).subscribe(
                (res) => {
                  console.log("Responce of recipe ", res);
                }
              );
        }
    }

    fetchRecipes() {

        return this.httpClient.get<Recipe[]>('https://app-recipe-86f47-default-rtdb.firebaseio.com/recipes.json')  
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : [] 
                    }   
                }) 
            }),
            tap(recipes => {
                this.recipeService.setRecipe(recipes);
            }));       
    }
}