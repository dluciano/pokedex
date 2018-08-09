import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Pokemon, NameEntity, TypeEntity } from './pokemon.model';

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
    //First, get all the urls of the pokemons, using as paginator the limit and offset variable.
    return this
      .http
      .get(this.endpoint + this.resources.pokemon + "?limit=" + options.limit + "&offset=" + options.offset)
      .toPromise()
      .then((response: any) => {
        //When this request end, then get the actual data of the pokemon
        let pokemonDetRequests = response.results.map((p: any) => {
          return this.http.get(p.url);
        });
        //Wait until all the data is loaded. This logic can be shown to show the results as they are finished
        let requestJoins = forkJoin(pokemonDetRequests);
        //Return the join of all the requests.
        return requestJoins.toPromise().then((p: any) => {
          //When all the request are finish convert the Pokeapi response object to the Pokemon entity
          return p.map((r: any) => {
            return PokemonService.fromResponse(r);
          });
        });
      });
  }

  //Factories methods. This can be in more complex classes.
  //But for simplicity, are added here as static methods.

  private static toNameEntity(data: { name, url }) {
    return new NameEntity(data.name, data.url);
  }

  private static fromResponse(data: any): Pokemon {
    return new Pokemon(data.id,
      data.name,
      data.types.map(e => {
        return this.toNameEntity(e.type);
      }),
      data.abilities.map(e => { return this.toNameEntity(e.ability); }),
      "https://pokeapi.co/api/v2/pokemon/"+data.id);
  }
}
