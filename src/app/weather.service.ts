import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";

import {connect} from "../const/connect";
import {TypeOfCall} from "../enums/typeOfCall";
import {Forecast} from "./forecast";
import {Weather} from "./weather";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeatherData(city, type): Observable<any> {
    const url = this.generateUrl(city, type);
    return this.http.get(url);
  }


  generateUrl(city, type: TypeOfCall): string {
    switch (type) {
      case TypeOfCall.CURRENT:
        return `${connect.serviceUrl}${connect.currentWeatherApi}lat=${city[0]}&lon=${city[1]}&appid=${connect.apiKey}&units=metric`;
      case TypeOfCall.WEEKLY:
      case TypeOfCall.DAILY:
        return `${connect.serviceUrl}${connect.oneCallApi}lat=${city[0]}&lon=${city[1]}&appid=${connect.apiKey}&units=metric`;
      case TypeOfCall.THREE_DAYS:
        return `${connect.serviceUrl}${connect.forecastApi}lat=${city[0]}&lon=${city[1]}&appid=${connect.apiKey}&units=metric`;
    }
  }





  generateOutputData(city, type): any {
    return this.getWeatherData(city, type).pipe(map(data => {
      const forecastData: Forecast[] = [];
      let count = 0;
      const endOfCount = type;
      const hourly = type === TypeOfCall.DAILY;
      const currWeatherData = hourly ? data.hourly : type === TypeOfCall.WEEKLY
        ? data.daily
        : data.list;
      for (const day of  currWeatherData) {
        if (!hourly || (hourly && (!count || !(count % 3)))) {
          forecastData.push(this.generateForecastObj(day , hourly, type));
        }
        count++;
        if (count === endOfCount) { break; }
      }
      return forecastData;
    }));

  }


  generateForecastObj(data, hourly, type): Forecast {
    let temp: number;
    let nightTemp: number = null;

    if (hourly) {
      temp = data.temp;
    } else if (type === TypeOfCall.THREE_DAYS) {
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

  getWeatherObject(city, type): Observable<any> {
    return this.getWeatherData(city, type).pipe(
      map(data => {
        return {
          temp: data.main.temp.toFixed(0),
          date: data.dt,
          icon: data.weather[0].icon,
          weather: data.weather[0].main,
          city: data.name
        };
      })
    );

  }


}
