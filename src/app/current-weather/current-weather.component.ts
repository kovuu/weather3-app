import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Weather} from '../entities/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnChanges {

  @Input()
    currentWeather: Weather;
  @Input()
    isDay: boolean;


  ngOnChanges(changes: SimpleChanges): void {
    this.currentWeather.date = Date.now();
  }
}
