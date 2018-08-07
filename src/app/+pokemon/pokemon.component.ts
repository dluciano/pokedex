import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from "./pokemon.model";
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Pokemon` component loaded asynchronously');

@Component({
  selector: 'pokemon',
  styleUrls: [
    './pokemon.component.scss'
  ],
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit {
  public pokemons: Pokemon[];

  constructor(private route: ActivatedRoute) { }

  public ngOnInit() {
    console.log('hello `Detail` component');
    console.log(this.route.snapshot.data);
    this.pokemons = this.route.snapshot.data.data as Array<Pokemon>;
  }

}
