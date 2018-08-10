import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'pokemon',
  styleUrls: [
    './pokemon.component.scss'
  ],
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit {

  @Input() public model: Pokemon = Pokemon.initial('', '');
  public state: string = 'loading';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokeService: PokemonService) { }

  public ngOnInit() {
    console.log(this.model.url);
    this.pokeService.getByUrl(this.model).then((m) => {
      this.state = 'loaded';
    });
  }

  public onShowDetails() {
    if (this.state === 'loading') {
      return;
    }
    this.router.navigate(['pokemon', this.model.id]);
  }

}
