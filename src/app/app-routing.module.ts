import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WeatherBlockComponent} from "./weather-block/weather-block.component";

const routes: Routes = [



  {
    path: ':mode/:city',
    component: WeatherBlockComponent,
  },
  {
    path: '',
    redirectTo: 'daily/taganrog',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
