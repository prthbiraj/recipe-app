import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute, 
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (param:Params) => {
        this.id = param['id'];
        this.editMode = param['id'] != null;
        this.initRecipeForm()
      }
    )
  }

  private initRecipeForm() {
    let id:number;
    let name: string = '';
    let description: string = '';
    let imgPath:string = '';
    let recipeIngredientes = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeById(this.id);
      id = this.id;
      name = this.recipe.name;
      description = this.recipe.description;
      imgPath = this.recipe.imgPath;
      if(this.recipe['ingredients']) {
          for(let ingredient of this.recipe.ingredients) {
            recipeIngredientes.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
          }
      }
    }

    this.recipeForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'imgPath': new FormControl(imgPath, Validators.required),
        'description': new FormControl(description),
        'ingredients' : recipeIngredientes
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {

    if(this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
        this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onClear();
  }

  onClear() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onRemoveIngredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
