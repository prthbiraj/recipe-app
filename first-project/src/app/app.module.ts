import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HighLightDirective } from './shared/directive/highlight.directive';
import { AdvHighlightDirective } from './shared/directive/adv-highlight.directive';
import { BtrHighlightDirective } from './shared/directive/btr-highlight.directive';
import { DefaultRecipeComponent } from './recipes/default-recipe/default-recipe.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptore } from './shared/interceptore/auth.interceptore';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    HighLightDirective,
    AdvHighlightDirective,
    BtrHighlightDirective,   
    DefaultRecipeComponent    
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptore, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
