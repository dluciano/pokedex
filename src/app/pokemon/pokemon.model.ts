import { Observable } from 'rxjs';

export class ApiEntity {
  constructor(public url: string) { }
  updateFromResponse(response: any): any { }
}

export class NameEntity extends ApiEntity {
  constructor(public name: string, public url: string) {
    super(url);
  }
}

export class Pokemon extends NameEntity {
  static LOADING_STATE: string = "Loading";
  //TODO: Load the common data from a catalog. The catalog service will have a group of entities
  //that will store in a cache this data. Every entity will have its own service and entity.
  //I can create a common service that retrieve the data and use a factory to create the models. The factory can be defined in the
  //service. Thus each service will have at least the url of the endpoint and a factory and will implement a common function
  //to retrieve by id and get all the entities.
  constructor(public id: number = 0,
    public name: string = "",
    public url: string = "",
    public types: Array<NameEntity> = new Array<NameEntity>(),
    public abilities: Array<NameEntity> = new Array<NameEntity>()) {
    super(name, url);
  }

  image() {
    return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.zeros() + ".png";
  }

  zeros() {
    return this.id <= 9 ? "00" + this.id :
      this.id <= 99 ? "0" + this.id :
        this.id;
  }

  updateFromResponse(response: any): any {
    this.id = response.id;
    this.name = response.name;
    response.abilities.forEach(e =>
      this.abilities.push(new NameEntity(e.ability.name, e.ability.url))
    );
    response.types.forEach(e =>
      this.types.push(new NameEntity(e.type.name, e.type.url))
    );
  }

  public static initial(name: string, url: string): Pokemon {
    return new Pokemon(0, name, url, new Array<NameEntity>(), new Array<NameEntity>())
  }
}

export class PokemonList extends Array<Pokemon>{
  constructor(public count: number, public previous: string, public next: string) {
    super();
  }
}