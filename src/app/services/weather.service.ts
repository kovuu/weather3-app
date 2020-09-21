import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {connect} from '../../const/connect';
import {TypeOfCall} from '../../enums/typeOfCall';
import {Forecast} from '../entities/forecast';
import {Weather} from '../entities/weather';
import {map} from 'rxjs/operators';
import {Predicatable} from './utilites /predicatable.utility';

@Injectable({
  providedIn: 'root',
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

  getForecast(city, type): Observable<Forecast[]> {
    return this.getWeatherData(city, type).pipe(map(data => {
      const forecastData: Forecast[] = [];
      let passedItems = 0;
      const numOfReqElements = type;
      const isHourlyForecast = type === TypeOfCall.DAILY;
      const currWeatherData = isHourlyForecast ? data.hourly : type === TypeOfCall.WEEKLY
        ? data.daily
        : data.list;
      for (const day of  currWeatherData) {
        if (Predicatable.needToPush(isHourlyForecast, passedItems)) {
          forecastData.push(this.generateForecastObj(day , isHourlyForecast, type));
        }
        passedItems++;
        if (passedItems === numOfReqElements) { break; }
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
      nightTemp = +data.temp.night.toFixed(0);
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

  getCurrentWeather(city, type): Observable<Weather> {
    return this.getWeatherData(city, type).pipe(
      map(data => {
        return {
          temp: +data.main.temp.toFixed(0),
          date: data.dt * 1000,
          icon: data.weather[0].icon,
          weather: data.weather[0].main,
          city: data.name
        };
      })
    );
  }
}
