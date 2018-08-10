import {
  Component,
  Input,
} from '@angular/core';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'pokemon-image',
  styleUrls: [
    './pokemon-image.component.scss'
  ],
  templateUrl: './pokemon-image.component.html'
})
export class PokemonImageComponent {
  @Input() public model: Pokemon;
  @Input() public showLoading: boolean;
}
