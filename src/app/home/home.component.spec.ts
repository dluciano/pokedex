import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
  getTestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
/**
 * Load the implementations that should be tested.
 */
import { HomeComponent } from './home.component';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonList } from '../pokemon/PokemonList';

describe(`Home`, () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let pokeServc: PokemonService;

  const pokemonServiceStub = {
    getAll() {
      const pokemons = Array<Pokemon>();
      pokemons.push(Pokemon.initial('bulbasaur', ''));
      const pokeList = new PokemonList(pokemons.length, '', '');
      pokemons.forEach((p) => pokeList.push(p));

      return new Promise((resolve, reject) => {
        resolve(pokeList);
      });
    }
  };

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: PokemonService, useValue: pokemonServiceStub }]
    })

      /**
       * Compile template and css.
       */
      .compileComponents();
    injector = getTestBed();
    pokeServc = injector.get(PokemonService);
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });

  it('should have 1 pokemon called `bulbasaur`', async(async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(comp.pokemons.length).toEqual(1);
    expect(comp.pokemons[0].name).toEqual('bulbasaur');
  }));
});
