import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "src/app/recipes/recipe.model";
import { DataStorageService } from "../services/data-storage-service";
import { RecipeService } from "../services/recipe.service";


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    
    constructor(private recipeDataService: DataStorageService,
        private recipeService: RecipeService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        const recipes: Recipe[] = this.recipeService.getRecipes();
        
        if(recipes.length === 0) {
            return this.recipeDataService.fetchRecipes();    
        } else {
            return recipes;
        }
            
    }

}