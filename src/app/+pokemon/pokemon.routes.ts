import { PokemonComponent } from './pokemon.component';

export const routes = [
  {
    path: '', children: [
      { path: '', component: PokemonComponent },
      { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
    ]
  },
];
