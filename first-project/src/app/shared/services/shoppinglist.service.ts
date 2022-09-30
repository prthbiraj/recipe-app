import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../model/ingredient.model";

@Injectable({providedIn:'root'})
export class ShoppingListService {

    public updatedIngredients = new Subject<Ingredient[]>();
    public startEditing = new Subject();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Tommato", 6)
      ];

    public getIngredients() {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.updatedIngredients.next(this.ingredients.slice());        
    }

    public getIngredient(id:number) {
        return this.ingredients[id];
    }

    public updateIngredient(id:number, newIngredient:Ingredient) {
        this.ingredients[id] = newIngredient;
        this.updatedIngredients.next(this.ingredients.slice());
    }

    public deleteIngredient(index:number) {
        this.ingredients.splice(index, 1);
        this.updatedIngredients.next(this.ingredients.slice());
    }
    
}