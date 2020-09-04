import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

enum ForecastMode {
    ONE_DAY= 1, THREE_DAYS = 3, WEEK= 7
}

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.css']
})
export class WeatherBlockComponent implements OnInit {
  constructor() { }
  private WeatherData: any;
  OutputWeatherData = [];
  private currentCity = [];
  citiesList = new Map();
  forecastMode: ForecastMode = ForecastMode.ONE_DAY;
  // tslint:disable-next-line:typedef
  ForecastMode = ForecastMode;

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
    };
    this.citiesList.set('Krasnodar', environment.KRASNODAR);
    this.citiesList.set('Taganrog', environment.TAGANROG);
    this.citiesList.set('Murmansk', environment.MURMANSK);
    this.citiesList.set('Vladivostok', environment.VLADIVOSTOK);
    this.citiesList.set('NewYork', environment.NEW_YORK);
    this.citiesList.set('Madrid', environment.MADRID);
    this.citiesList.set('Moscow', environment.MOSCOW);
    this.currentCity = (environment.TAGANROG);
    this.getWeatherData();
  }
  // tslint:disable-next-line:typedef
  getWeatherData() {
    let url: string;
    url = `${environment.serviceUrl}lat=${this.currentCity[0]}&lon=${this.currentCity[1]}&appid=${environment.apiKey}&units=metric`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setWeatherData(data));
  }
  // tslint:disable-next-line:typedef
  setWeatherData(data) {
      this.WeatherData = data;
      this.chooseForecastMode(this.forecastMode);
  }
  // tslint:disable-next-line:typedef
  getDailyForecast(days) {
    this.OutputWeatherData.length = 0;
    let count = 0;
    for (const day of  this.WeatherData.daily) {
      const obj = {
        temp: day.temp.day.toFixed(0),
        date: day.dt * 1000,
        icon: day.weather[0].icon,
        weather: day.weather[0].main,
      };

      this.OutputWeatherData.push(obj);
      count++;
      if (count === days) { break; }
    }
  }
  // tslint:disable-next-line:typedef
  getHourlyForecast() {
    this.OutputWeatherData.length = 0;
    let count = 0;
    for (const day of  this.WeatherData.hourly) {
      const obj = {
        temp: day.temp.toFixed(0),
        date: day.dt * 1000,
        icon: day.weather[0].icon,
        weather: day.weather[0].main,
      };
      if (count === 0 || count % 3 === 0) {
        this.OutputWeatherData.push(obj);
      }
      count++;
      if (count === 25) { break; }
    }

  }
  // tslint:disable-next-line:typedef
  changeCity(city) {
    this.currentCity = city;
    this.getWeatherData();
  }
  // tslint:disable-next-line:typedef
  chooseForecastMode(mode) {
     switch (mode) {
       case this.ForecastMode.ONE_DAY:
         this.forecastMode = ForecastMode.ONE_DAY;
         this.getHourlyForecast();
         break;
       case this.ForecastMode.THREE_DAYS:
         this.forecastMode = ForecastMode.THREE_DAYS;
         this.getDailyForecast(this.forecastMode);
         break;
       case this.ForecastMode.WEEK:
         this.forecastMode = ForecastMode.WEEK;
         this.getDailyForecast(this.forecastMode);
         break;
     }
  }
}
