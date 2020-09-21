import {async, TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientModule} from '@angular/common/http';
import {cities} from '../../const/cities';
import {TypeOfCall} from '../../enums/typeOfCall';
import {connect} from '../../const/connect';
import {Weather} from '../entities/weather';
import {asyncScheduler, of} from 'rxjs';
import jsonData from '../data.json';
import {Forecast} from '../entities/forecast';

describe('WeatherService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let weatherService: WeatherService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    weatherService = new WeatherService(httpClientSpy as any);
  });


  it('should return url', () => {
    const url = `${connect.serviceUrl}${connect.currentWeatherApi}lat=45.0328&lon=38.9769&appid=${connect.apiKey}&units=metric`;

    expect(weatherService.generateUrl(cities.KRASNODAR, TypeOfCall.CURRENT)).toBe(url);
  });

  it('should return expected currentWeather data', () => {
    const expectedData: Weather =
      {
        temp: 14,
        date: 1600075595 * 1000,
        icon: '04d',
        weather: 'Clouds',
        city: 'Moscow'
      };

    const testJson = JSON.parse(`{"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":14.33,"feels_like":8.33,"temp_min":14,"temp_max":15,"pressure":1016,"humidity":67},"visibility":10000,"wind":{"speed":8,"deg":270},"clouds":{"all":75},"dt":1600075595,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1600052395,"sunset":1600098622},"timezone":10800,"id":524901,"name":"Moscow","cod":200}`);
    httpClientSpy.get.and.returnValue(of(testJson));
    weatherService.getCurrentWeather(cities.MOSCOW, TypeOfCall.CURRENT).subscribe(
        res => expect(res).toEqual(expectedData, 'expected data'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected Observable data', () => {
    const testJson = JSON.parse(`{"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":14.33,"feels_like":8.33,"temp_min":14,"temp_max":15,"pressure":1016,"humidity":67},"visibility":10000,"wind":{"speed":8,"deg":270},"clouds":{"all":75},"dt":1600075595,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1600052395,"sunset":1600098622},"timezone":10800,"id":524901,"name":"Moscow","cod":200}`);

    httpClientSpy.get.and.returnValue(of(testJson));
    weatherService.getWeatherData(cities.MOSCOW, TypeOfCall.CURRENT).subscribe(
      res => expect(res).toEqual(testJson, 'expected Json'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


  it('should return expected Observable Forecast data array', () => {
    const stubData: Array<Forecast> = [
      {
        city: undefined,
        date: 1600052400000,
        icon: '10d',
        nightTemp: 15,
        temp: 14,
        weather: 'Rain'
      },
      {
        city: undefined,
        date: 1600138800000,
        icon: '10d',
        nightTemp: 16,
        temp: 17,
        weather: 'Rain'
      },
      {
        city: undefined,
        date: 1600225200000,
        icon: '04d',
        nightTemp: 18,
        temp: 18,
        weather: 'Clouds'
      },
      {
        city: undefined,
        date: 1600311600000,
        icon: '10d',
        nightTemp: 17,
        temp: 18,
        weather: 'Rain'
      },
      {
        city: undefined,
        date: 1600398000000,
        icon: '10d',
        nightTemp: 17,
        temp: 19,
        weather: 'Rain'
      },
      {
        city: undefined,
        date: 1600484400000,
        icon: '10d',
        nightTemp: 16,
        temp: 18,
        weather: 'Rain'
      },
      {
        city: undefined,
        date: 1600570800000,
        icon: '10d',
        nightTemp: 13,
        temp: 17,
        weather: 'Rain'
      }
    ];



    const testJson = jsonData;
    httpClientSpy.get.and.returnValue(of(testJson));
    weatherService.getForecast(cities.YEKATERINBURG, TypeOfCall.WEEKLY).subscribe(
        res => expect(res).toEqual(stubData, '21231'),
       fail
     );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');


  });


  it('should return forecast object', () => {
    const stubObject: Forecast = {
      nightTemp: 6,
      temp: 9,
      date: 1600585200000,
      icon: '10d',
      weather: 'Rain',
      city: undefined
    };


    const stubData = {
      clouds: 87,
      dew_point: 4.44,
      dt: 1600585200,
      feels_like: {day: 4.7, night: 2.76, eve: 4.86, morn: 5.36},
      humidity: 74,
      pop: 0.36,
      pressure: 1005,
      rain: 0.25,
      sunrise: 1600565933,
      sunset: 1600610585,
      temp: {day: 8.73,
        eve: 8.98,
        max: 10.56,
        min: 6.29,
        morn: 7.98,
        night: 6.29},
    uvi: 2.23,
    weather: [{id: 500, main: 'Rain', description: 'light rain', icon: '10d'}],
    wind_deg: 274,
    wind_speed: 3.97
    };

    expect(weatherService.generateForecastObj(stubData, false, TypeOfCall.WEEKLY)).toEqual(stubObject);
  });
});
