import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { Pokemon, NameEntity, PokemonList } from './pokemon.model';

export interface IApiService<T> {
  getByUrl(entity: T): Promise<T>;
  getAll(limit: number, offset: number): Promise<PokemonList>;
  getById(id: number): Promise<T>;
}

@Injectable()
export class PokemonService implements IApiService<Pokemon> {
  private cache: PokemonList;

  constructor(private http: HttpClient) { }

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
        let pokemons = response.results.map((p: any) => {
          return Pokemon.initial(p.name, p.url);
        });
        pokemons.forEach(p => currentPokeList.push(p));
        currentPokeList.count = response.count;
        currentPokeList.previous = response.previous;
        currentPokeList.next = response.next;
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
        this.cache = list;
        return list;
      });
  }

  getByUrl(entity: Pokemon): Promise<Pokemon> {
    return this.http.get(entity.url).toPromise().then(response => {
      entity.updateFromResponse(response);
      return entity;
    });
  }

  getById(id: number): Promise<Pokemon> {
    if (this.cache) {
      let pokemon: Pokemon = this.cache.filter(p => p.id === id)[0];
      if (pokemon)
        return new Promise<Pokemon>((resolve, error) => {
          resolve(pokemon);
        });
    }
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + "/" + id)
      .toPromise()
      .then((response: any) => {
        let pResult = Pokemon.initial(response.name, response.url);
        pResult.updateFromResponse(response);
        return pResult;
      });
  }
}
