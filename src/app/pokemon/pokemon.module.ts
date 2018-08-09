import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './pokemon.routes';
import { PokemonComponent } from './pokemon.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { PokemonImageComponent } from './pokemon-image/pokemon-image.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    PokemonComponent,
    ChildDetailComponent,
    PokemonImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PokemonModule {
  public static routes = routes;
}