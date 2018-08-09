import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router'

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`ChildDetail` component loaded asynchronously');

@Component({
  selector: 'child-detail',
   styleUrls: [
    './child-detail.component.scss'
  ],
  templateUrl: './child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {
  constructor(
    private router: Router) { }

  public ngOnInit() {
    console.log('hello `ChildDetail` component');
  }

  public goToList() {
     this.router.navigate(['./']);
  }
}
