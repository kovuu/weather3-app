import {Component, Input, OnInit} from '@angular/core';
import {cities} from "../../const/cities";

@Component({
  selector: 'app-city-buttons',
  templateUrl: './city-buttons.component.html',
  styleUrls: ['./city-buttons.component.css']
})
export class CityButtonsComponent  {

  @Input()
    citiesMap: any;
  @Input()
    forecastMode: string;
  @Input()
    currentCity: string;



}
