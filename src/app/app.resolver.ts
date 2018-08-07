import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Pokemon } from './+pokemon/pokemon.model';
import { PokemonService } from './+pokemon/pokemon.service';

@Injectable()
export class PokemonDataResolver implements Resolve<Pokemon> {
  constructor(private pokemonSrv: PokemonService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let options = { id: undefined, limit: 12, offset: 0 };
    options.id = route.params.id ? parseInt(route.params.id) : options.id;
    options.limit = route.params.limit ? route.params.limit : options.limit;
    options.offset = route.params.offset ? route.params.offset : options.offset;
    var r = this.pokemonSrv.get(options);
    return r;
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  PokemonDataResolver
];
