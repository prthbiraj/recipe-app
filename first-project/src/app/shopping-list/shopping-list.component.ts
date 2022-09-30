import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from '../shared/services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingredSub: Subscription;
  

  constructor(private shoppingListService:ShoppingListService) { 
    this.ingredients = this.shoppingListService.getIngredients();
  }  
  ngOnInit(): void {
    this.ingredSub = this.shoppingListService.updatedIngredients.subscribe(
      (ingreds: Ingredient[]) => this.ingredients = ingreds
    );
  }

  ngOnDestroy(): void {
    this.ingredSub.unsubscribe();
  }

  onEdit(index: number) {    
    this.shoppingListService.startEditing.next(index);
  }
  
}
