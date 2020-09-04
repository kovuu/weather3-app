import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

enum ForecastMode {
    ONE_DAY= 25, THREE_DAYS = 24, WEEK= 7
}

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.css']
})
export class WeatherBlockComponent implements OnInit {

  private WeatherData: any;
  OutputWeatherData = [];
  currentCity: string ;
  citiesList = new Map();
  forecastMode: ForecastMode = ForecastMode.ONE_DAY;
  // tslint:disable-next-line:typedef
  ForecastMode = ForecastMode;
  cityIsChanged = false;


  constructor() {

  }

  ngOnInit(): void {
    this.WeatherData = {
      flag: true,
    };
    this.citiesList.set('Krasnodar', environment.KRASNODAR);
    this.citiesList.set('Taganrog', environment.TAGANROG);
    this.citiesList.set('Murmansk', environment.MURMANSK);
    this.citiesList.set('Vladivostok', environment.VLADIVOSTOK);
    this.citiesList.set('NewYork', environment.NEW_YORK);
    this.citiesList.set('Madrid', environment.MADRID);
    this.citiesList.set('Moscow', environment.MOSCOW);
    this.currentCity = 'Taganrog';
    this.getForecastForMode(this.forecastMode);
  }
  // tslint:disable-next-line:typedef
  getWeatherData() {
    let url: string;
    // tslint:disable-next-line:triple-equals
    const typeOfCall = this.forecastMode === ForecastMode.THREE_DAYS ? environment.serviceForecastUrl : environment.serviceOneCallUrl;
    url = `${environment.serviceUrl}${typeOfCall}?lat=${this.citiesList.get(this.currentCity)[0]}&lon=${this.citiesList.get(this.currentCity)[1]}&appid=${environment.apiKey}&units=metric`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setWeatherData(data));
    console.log(22);
  }

  // tslint:disable-next-line:typedef
  setWeatherData(data) {
    this.WeatherData = data;

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
  getForecast(type) {
    this.OutputWeatherData.length = 0;
    let count = 0;
    const endOfCount = type;
    const hourly = type === ForecastMode.ONE_DAY;
    // tslint:disable-next-line:max-line-length
    const currWeatherData = hourly ? this.WeatherData.hourly : this.forecastMode === ForecastMode.WEEK
                  ? this.WeatherData.daily : this.WeatherData.list;
    let temp;
    let temp_night;
    for (const day of  currWeatherData) {
      temp = hourly ? day.temp.toFixed(0) : this.forecastMode === ForecastMode.WEEK
                                ? day.temp.day.toFixed(0) : day.main.temp.toFixed(0);
      temp_night = this.forecastMode === ForecastMode.WEEK ? day.temp.night.toFixed(0) : null;
      const obj = {
        temp,
        temp_night,
        date: day.dt * 1000,
        icon: day.weather[0].icon,
        weather: day.weather[0].main,
      };
      if (!hourly || (hourly && (count === 0 || count % 3 === 0))) {
        this.OutputWeatherData.push(obj);
      }
      count++;
      if (count === endOfCount) { break; }

    }
  }
  // tslint:disable-next-line:typedef
  changeCity(city) {
    this.currentCity = city;
    this.cityIsChanged = true;
    this.getForecastForMode(this.forecastMode);
    this.cityIsChanged = false;

  }

  // tslint:disable-next-line:typedef
  getCurrentCity() {
    return this.currentCity;
}

  // tslint:disable-next-line:typedef
  isDay(time) {
    return (time < 18 && time > 5);
  }


  // tslint:disable-next-line:typedef
  getForecastForMode(mode) {
    this.forecastMode = mode;
    // tslint:disable-next-line:max-line-length
    if (this.WeatherData.flag || this.cityIsChanged || this.WeatherData.hourly && this.forecastMode === ForecastMode.THREE_DAYS || (this.WeatherData.list && this.forecastMode !== ForecastMode.THREE_DAYS)) {
      this.getWeatherData();
    }
    setTimeout(() => this.getForecast(this.forecastMode), 1000);

}
}

