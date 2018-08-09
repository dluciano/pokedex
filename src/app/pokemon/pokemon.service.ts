import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Pokemon, NameEntity, PokemonList } from './pokemon.model';

export interface IApiService<T> {
  getByUrl(entity: T): Promise<T>;
  getAll(limit: number, offset: number): Promise<PokemonList>;
}

@Injectable()
export class PokemonService implements IApiService<Pokemon> {
  constructor(
    public http: HttpClient
  ) { }

  endpoint: string = "http://pokeapi.salestock.net/api/v2";
  resources = {
    pokemon: "/pokemon"
  };

  getAllFromUrl(url: string, currentPokeList: PokemonList): Promise<PokemonList> {
    return this
      .http
      .get(url)
      .toPromise()
      .then((response: any) => {
        //let pokemons: Pokemon[] = new Array<Pokemon>();
        //pokemons.concat(currentPokeList);
        currentPokeList.concat(response.results.map((p: any) => {
          return Pokemon.initial(p.name, p.url);
        }));
        //var newPokeList = new PokemonList(response.count, pokemons, response.previous, response.next);
        return currentPokeList;
      });
  }

  getAll(limit: number, offset: number): Promise<PokemonList> {
    //First, get all the urls of the pokemons, using as paginator the limit and offset variable.
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + "?limit=" + limit + "&offset=" + offset)
      .toPromise()
      .then((response: any) => {
        let pokemons = response.results.map((p: any) => {
          return Pokemon.initial(p.name, p.url);
        });
        let list = new PokemonList(response.count, response.previous, response.next);
        pokemons.forEach(p => list.push(p));
        return list;
      });
  }

  getByUrl(entity: Pokemon): Promise<Pokemon> {
    return this.http.get(entity.url).toPromise().then(response => {
      entity.updateFromResponse(response);
      return entity;
    });
  }
}
