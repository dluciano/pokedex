import {
  Component,
  OnInit
} from '@angular/core';

import { PokemonList } from "../pokemon/pokemon.model";
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'home',
  styleUrls: [
    './home.component.scss'
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public pokemons: PokemonList = new PokemonList(0, "", "");
  public offset: number = 1;
  public currentPage: number = -1;

  public state: string = "initial-loading";

  constructor(private pokemonService: PokemonService) { }

  public ngOnInit() {
    console.log('Home component loaded');
    this.load();
  }

  private load() {
    this.currentPage++;
    this.pokemonService
      .getAll(this.offset, this.currentPage)
      .then(pokemonList => {
        this.pokemons = pokemonList;
        this.state = "loaded";
      });
  }
  public onLoadMore() {
    this.state = "loading";
    this.currentPage++;
    this.pokemonService
      .getAllFromUrl(this.pokemons.next, this.pokemons)
      .then(pokemonList => {
        this.state = "loaded";
      });
  }
}
