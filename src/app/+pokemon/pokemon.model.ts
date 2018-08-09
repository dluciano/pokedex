export class ApiEntity {
  constructor(public url: string) { }
}

export class NameEntity extends ApiEntity {
  constructor(public name: string, public url: string) {
    super(url);
  }
}

export class Pokemon extends ApiEntity {
  //TODO: Load the common data from a catalog. The catalog service will have a group of entities
  //that will store in a cache this data. Every entity will have its own service and entity.
  //I can create a common service that retrieve the data and use a factory to create the models. The factory can be defined in the
  //service. Thus each service will have at least the url of the endpoint and a factory and will implement a common function
  //to retrieve by id and get all the entities.
  constructor(public id: number,
    public name: string,
    public types: Array<NameEntity>,
    public abilities: Array<NameEntity>,
    public url: string) {
    super(url);
  }

  image() {
    return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.zeros() + ".png";
  }

  zeros() {
    return this.id <= 9 ? "00" + this.id :
      this.id <= 99 ? "0" + this.id :
        this.id;
  }
}