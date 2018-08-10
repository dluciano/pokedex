import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'child-detail',
  styleUrls: [
    './child-detail.component.scss'
  ],
  templateUrl: './child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {
  public model: Pokemon = Pokemon.initial("", "");
  public state: string = "loading";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pokeService: PokemonService) { }

  public ngOnInit() {
    this.route.params.subscribe(p => console.log(p));
    this.pokeService.getById(parseInt(this.route.snapshot.params.id)).then(p => {
      this.model = p;
      this.model.isLargeImage = true;
      this.state = "loaded";
    });
    console.log('hello `ChildDetail` component');
  }

  public goToList() {
    this.router.navigate(['./']);
  }
}
