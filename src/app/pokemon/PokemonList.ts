import { Pokemon } from './pokemon.model';
export class PokemonList extends Array<Pokemon> {
    constructor(public count: number, public previous: string, public next: string) {
        super();
    }
}
