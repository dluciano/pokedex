import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routes } from './home.routes';
import { ChildDetailComponent } from '../pokemon/child-detail/child-detail.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ChildDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class HomeModule {
  public static routes = routes;
}
