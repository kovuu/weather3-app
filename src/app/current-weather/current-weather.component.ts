import {Component, Input, OnInit} from '@angular/core';
import {Weather} from '../entities/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {

  @Input()
    currentWeather: Weather;
  @Input()
    isDay: boolean;



}
