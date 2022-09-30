import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
    {
        path:'', 
        component:ShoppingListComponent
    }
];

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent],
    imports:[
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule, 
        ReactiveFormsModule
    ]
})
export class ShoppingListModule {

}