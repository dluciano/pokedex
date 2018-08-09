import { Routes } from '@angular/router';
//import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomeComponent } from './home/home.component';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  //{ path: '', loadChildren: './+pokemon#PokemonModule', resolve: { data: APP_RESOLVER_PROVIDERS[0] } },
  //{ path: 'pokemon', loadChildren: './+pokemon#PokemonModule', resolve: { data: APP_RESOLVER_PROVIDERS[0] } },
  { path: '', component: HomeComponent },
  { path: '**', component: NoContentComponent },
];
