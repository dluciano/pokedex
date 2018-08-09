import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Pokemon, NameEntity, PokemonList } from './pokemon.model';

export interface IApiService<T> {
  //getById(id: number): Promise<Observable<T>>;
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

  //public get(options: any): any {
  //  if (options && options.id) {
  //    return this.getById(options.id);
  //  }
  //  return this.getAll(limit: number, offset: number);
  //}

  //getById(id: number): Promise<Observable<Pokemon>> {
  //  return this
  //    .http
  //    .get(this.endpoint + this.resources.pokemon + id)
  //    .toPromise()
  //    .then((response: Response) => {
  //      //return of(PokemonService.fromResponse(response.json()));
  //      return of(new Pokemon());
  //    });
  //}
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


        ////When this request end, then get the actual data of the pokemon
        //let pokemonDetRequests = response.results.map((p: any) => {
        //  return this.http.get(p.url);
        //});
        ////Wait until all the data is loaded. This logic can be shown to show the results as they are finished
        //let requestJoins = forkJoin(pokemonDetRequests);
        ////Return the join of all the requests.
        //return requestJoins.toPromise().then((p: any) => {
        //  //When all the request are finish convert the Pokeapi response object to the Pokemon entity
        //  return p.map((r: any) => {
        //    return PokemonService.fromResponse(r);
        //  });
        //});
      });
  }
}
