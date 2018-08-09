import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Pokemon, NameEntity } from './pokemon/pokemon.model';
import { PokemonService } from './pokemon/pokemon.service';

@Injectable()
export class PokemonDataResolver implements Resolve<any> {
  constructor(private pokemonSrv: PokemonService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of("resolver");
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  PokemonDataResolver
];
