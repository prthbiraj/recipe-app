import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../shared/guard/auth.gaurd";
import { RecipeResolverService } from "../shared/resolver/recipe.resolver.service";
import { DefaultRecipeComponent } from "./default-recipe/default-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path:'', 
        canActivate: [AuthGaurd],  
        component:RecipesComponent, 
    children: [
        {
            path:'', 
            component:DefaultRecipeComponent},
        {
            path:'new', 
            component:RecipesEditComponent},
        {
            path:':id/edit', 
            component:RecipesEditComponent, 
            resolve: [RecipeResolverService]},
        {
            path:':id', 
            component:RecipeDetailComponent, 
            resolve: [RecipeResolverService]}
      ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}