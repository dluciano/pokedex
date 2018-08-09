import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

import { Pokemon } from "./pokemon.model";
import { PokemonService } from './pokemon.service';
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

  @Input() model: Pokemon = Pokemon.initial("", "");
  public state: string = "loading";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pokeService: PokemonService) { }

  public ngOnInit() {
    this.pokeService.getByUrl(this.model).then(m => {
      this.state = "loaded";
    });
  }

  public onShowDetails() {
    this.router.navigate(['./child-detail', this.model.id]);
  }

}
