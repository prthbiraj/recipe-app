import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./directive/dropdown.directive";
import { UnlessDirective } from "./directive/unless.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        UnlessDirective,
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports:[CommonModule],
    exports:[
        UnlessDirective,
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ]
})
export class SharedModule {

}