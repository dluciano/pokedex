import { NameEntity } from './NameEntity';
import { Ability } from './Ability';

export class Pokemon extends NameEntity {
  public static LOADING_STATE: string = 'Loading';

  public static initial(name: string, url: string): Pokemon {
    return new Pokemon(0, name, url, new Array<NameEntity>(), new Array<NameEntity>());
  }

  public isLargeImage: boolean = false;
  public height: number = 0;
  public weight: number = 0;
  public firstAbility: Ability = new Ability(0, '', '');

  constructor(public id: number = 0,
              public name: string = '',
              public url: string = '',
              public types: NameEntity[] = new Array<NameEntity>(),
              public abilities: NameEntity[] = new Array<NameEntity>()) {
    super(name, url);
  }

  public image() {
    return 'https://assets.pokemon.com/assets/cms2/img/pokedex/' +
      (this.isLargeImage ? 'full' : 'detail') + '/' + this.zeros() + '.png';
  }

  public zeros() {
    return this.id <= 9 ? '00' + this.id :
      this.id <= 99 ? '0' + this.id :
        this.id;
  }

  public updateFromResponse(response: any): any {
    this.id = response.id;
    this.name = response.name;
    this.height = response.height;
    this.weight = response.weight;
    response.abilities.forEach((e) => {
      const ab = new Ability(e.slot, e.ability.name, e.ability.url);
      if (e.slot <= 1) {
        this.firstAbility = ab;
      }
      this.abilities.push(ab);
    });
    response.types.forEach((e) =>
      this.types.push(new NameEntity(e.type.name, e.type.url))
    );
  }
}
