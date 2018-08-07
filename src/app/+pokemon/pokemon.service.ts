import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Pokemon } from './pokemon.model';

export interface IApiService<T> {
  getById(id: number): Promise<Observable<T>>;
  getAll(options: any): Promise<Observable<T[]>>;
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

  public get(options: any): any {
    if (options && options.id) {
      return this.getById(options.id);
    }
    return this.getAll(options);
  }

  getById(id: number): Promise<Observable<Pokemon>> {
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + id)
      .toPromise()
      .then((response: Response) => {
        return of(PokemonService.fromResponse(response.json()));
      });
  }

  getAll(options: { limit: number, offset: number }): Promise<Observable<Pokemon[]>> {
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + "?limit=" + options.limit + "&offset=" + options.offset)
      .toPromise()
      .then((response: any) => {
        let pokemonDetRequests = response.results.map((p: any) => {
          return this.http.get(p.url);
        });
        let f = forkJoin(pokemonDetRequests);
        let t = f.toPromise().then((p: any) => {
          var x = 1;
          var poks = p.map((r: any) => {
            return PokemonService.fromResponse(r);
          });
          return poks;
        });

        return t;
      });
  }


  private static fromResponse(data: any): Pokemon {
    return new Pokemon(data.id, data.name, data.abilities.map(elem => { return {name: elem.ability.name, color: "#ff33dd" };  }));
  }
}
