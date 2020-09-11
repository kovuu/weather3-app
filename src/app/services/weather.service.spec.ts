import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {TypeOfCall} from "../../enums/typeOfCall";
import {Observable} from "rxjs";
import {Weather} from "../entities/weather";


describe('WeatherService', () => {

  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService]
    });

    weatherService = TestBed.get(WeatherService);
  });

  it('getWeatherObject() should return Observable<Weather> object', () => {
    spyOn(weatherService, 'getWeatherObject').and.callThrough()


    expect(weatherService.getWeatherObject).toHaveBeenCalled();
  })


});
