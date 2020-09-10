import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {WeatherService} from "../weather.service";
import {Weather} from "../weather";
import {TypeOfCall} from "../../enums/typeOfCall";
import {cities} from "../../const/cities";
import {ActivatedRoute} from "@angular/router";
import {CommunicationService} from "../communication.service";
import {forkJoin, Subject, Subscription} from "rxjs";
import {finalize, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {Forecast} from "../forecast";
import {log} from "util";

const DEFAULT_CITY = 'taganrog';

const m = {
  'daily': TypeOfCall.DAILY,
  'weekly': TypeOfCall.WEEKLY,
  'three-days': TypeOfCall.THREE_DAYS
};

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.css'],
  providers: [CommunicationService]
})
export class WeatherBlockComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  currentWeather: Weather;
  currentCity: string;
  citiesMap = new Map();
  typeOfCall: TypeOfCall;
  typeOfCallMap = TypeOfCall;
  forecastMode: string;
  sub: Subscription;
  forecast: Forecast[] = [];

  isLoading = true;

  get isDay(): boolean {
    const date = new Date(this.currentWeather.date);
    const hour = date.getHours();
    return (hour < 18 && hour > 5);
  }

  constructor(private weatherService: WeatherService,
              private cityService: CommunicationService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route
        .params
        .pipe(
          map(({ city, mode }) => ({
            mode,
            city: (city || DEFAULT_CITY).toUpperCase()
          })),
          tap(({ city, mode }) => {
            this.currentCity = city;
            this.forecastMode = mode;
            this.typeOfCall = m[mode];
            this.citiesMap = new Map(Object.entries(cities));
          }),
          map(({ city, mode }) => ({
            currentWeather: this.weatherService.getWeatherObject(cities[this.currentCity.toUpperCase()], TypeOfCall.CURRENT),
            forecast: this.weatherService.generateOutputDataq(cities[this.currentCity.toUpperCase()], this.typeOfCall)
          })),
          takeUntil(this._destroy$)
        )
        .subscribe(({ currentWeather, forecast}) =>
        {
          this.isLoading = true;
          currentWeather.subscribe(data => this.currentWeather = data);
          forecast.subscribe(data => this.forecast = data);
          this.isLoading = false;
        });

  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  generateOutputData(data): any {
    const forecastData: Forecast[] = [];
    this.forecast.length = 0;
    let count = 0;
    const endOfCount = this.typeOfCall;
    const hourly = this.typeOfCall === TypeOfCall.DAILY;
    const currWeatherData = hourly ? data.hourly : this.typeOfCall === TypeOfCall.WEEKLY
      ? data.daily : data.list;
    for (const day of  currWeatherData) {
      if (!hourly || (hourly && (count === 0 || count % 3 === 0))) {
        forecastData.push(this.generateForecastObj(day , hourly));
      }
      count++;
      if (count === endOfCount) { break; }
    }
    return forecastData;
  }

  generateForecastObj(data, hourly): Forecast {
    let temp: number;
    let nightTemp: number = null;
    if (hourly) {
      temp = data.temp;
    } else if (this.typeOfCall === TypeOfCall.THREE_DAYS) {
      temp = data.main.temp;
    }  else  {
      temp = data.temp.day;
      nightTemp = data.temp.night.toFixed(0);
    }
    return {
      nightTemp,
      temp: +temp.toFixed(0),
      date: data.dt * 1000,
      icon: data.weather[0].icon,
      weather: data.weather[0].main,
      city: data.name
    };
  }




  // tslint:disable-next-line:typedef

/*
  isDay(time): boolean {
    return (time < 18 && time > 5);
  }*/

}

