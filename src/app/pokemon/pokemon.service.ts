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
  protocol: 'https',
  hostName: 'pokeapi.co/',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
});

@Injectable()
export class PokemonService implements IApiService<Pokemon> {
  public getAllFromUrl(url: string, currentPokeList: PokemonList): Promise<PokemonList> {
    return P.resource([url])
      .then((r: any) => {
        const response = r[0];
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
      return list;
    });
  }

  public getByUrl(entity: Pokemon): Promise<Pokemon> {
    return  P.resource([entity.url]).then((response) => {
      entity.updateFromResponse(response[0]);
      return entity;
    });
  }

  public getById(id: number): Promise<Pokemon> {
    return P.getPokemonByName(id)
      .then((response: any) => {
        const pResult = Pokemon.initial(response.name, response.url);
        pResult.updateFromResponse(response);
        return pResult;
      });
  }
}
