import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon.model';
import { PokemonList } from './PokemonList';
import { Pokedex } from 'pokeapi-js-wrapper';

export interface IApiService<T> {
  getByUrl(entity: T): Promise<T>;
  getAll(limit: number, offset: number): Promise<PokemonList>;
  getById(id: number): Promise<T>;
}

const P = new Pokedex({
  protocol: 'http',
  hostName: 'pokeapi.salestock.net/',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
});

@Injectable()
export class PokemonService implements IApiService<Pokemon> {

  private cache: PokemonList;
  private endpoint: string = 'http://pokeapi.salestock.net/api/v2';
  private resources = {
    pokemon: '/pokemon'
  };

  constructor(private http: HttpClient) { }

  public getAllFromUrl(url: string, currentPokeList: PokemonList): Promise<PokemonList> {
    return this
      .http
      .get(url)
      .toPromise()
      .then((response: any) => {
        const pokemons = response.results.map((p: any) => {
          return Pokemon.initial(p.name, p.url);
        });
        pokemons.forEach((p) => currentPokeList.push(p));
        currentPokeList.count = response.count;
        currentPokeList.previous = response.previous;
        currentPokeList.next = response.next;
        return currentPokeList;
      });
  }

  public getAll(limit: number, offset: number): Promise<PokemonList> {
    // First, get all the urls of the pokemons, using as paginator the limit and offset variable.
    return P.getPokemonsList({ limit, offset }).then((response: any) => {
      const pokemons = response.results.map((p: any) => {
        return Pokemon.initial(p.name, p.url);
      });
      const list = new PokemonList(response.count, response.previous, response.next);
      pokemons.forEach((p) => list.push(p));
      // this.cache = list;
      return list;
    });
  }

  public getByUrl(entity: Pokemon): Promise<Pokemon> {
    return this.http.get(entity.url).toPromise().then((response) => {
      entity.updateFromResponse(response);
      return entity;
    });
  }

  public getById(id: number): Promise<Pokemon> {
    if (this.cache) {
      const pokemon: Pokemon = this.cache.filter((p) => p.id === id)[0];
      if (pokemon) {
        return new Promise<Pokemon>((resolve, error) => {
          resolve(pokemon);
        });
      }
    }
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + '/' + id)
      .toPromise()
      .then((response: any) => {
        const pResult = Pokemon.initial(response.name, response.url);
        pResult.updateFromResponse(response);
        return pResult;
      });
  }
}
