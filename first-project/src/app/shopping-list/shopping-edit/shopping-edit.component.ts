import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shoppinglist.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  
  subscription:Subscription;
  editMode:boolean = false;
  editedItemIndex:number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }
  

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
                      .subscribe(
                        (index:number) => {
                          
                            this.editMode = true;
                            this.editedItemIndex = index;
                            this.editedItem = this.shoppingListService.getIngredient(index);
                            this.slForm.setValue({
                              name: this.editedItem.name,
                              amount: this.editedItem.amount
                            });
                        }
                      )
  }

  onSubmit(form: NgForm) {   
    const newIngredient = new Ingredient(form.value.name, 
      form.value.amount);
    
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }    
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  OnClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }
}
