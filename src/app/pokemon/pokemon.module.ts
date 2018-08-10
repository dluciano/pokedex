import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PokemonComponent } from './pokemon.component';
import { PokemonImageComponent } from './pokemon-image/pokemon-image.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    PokemonComponent,
    PokemonImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class PokemonModule {
}
