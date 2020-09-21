import {ComponentFixture, TestBed} from '@angular/core/testing';

import { WeatherBlockComponent } from './weather-block.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Weather} from '../entities/weather';
import {WeatherService} from '../services/weather.service';
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';
import {Forecast} from '../entities/forecast';
import {DebugElement} from "@angular/core";

describe('WeatherBlockComponent', () => {
  let component: WeatherBlockComponent;
  let fixture: ComponentFixture<WeatherBlockComponent>;
  let mockWeatherService: SpyObj<WeatherService>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  const stubCurrentWeather: Weather = {
    temp: 22,
    icon: '23c',
    weather: 'Cloud',
    city: 'Krasnodar',
    date: 1600624775221
  };

  const stubForecast: Array<Forecast> = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherBlockComponent ],
      imports: [HttpClientModule, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{
        provide: WeatherService,
        useValue: jasmine.createSpyObj('WeatherService', ['getCurrentWeather', 'getForecast'])
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherBlockComponent);
    component = fixture.componentInstance;
    mockWeatherService = TestBed.get(WeatherService);
    mockWeatherService.getCurrentWeather.and.returnValue(of(stubCurrentWeather));
    mockWeatherService.getForecast.and.returnValue(of(stubForecast));
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 header', () => {
    nativeEl = debugEl.nativeElement;
    expect(nativeEl.querySelector('h1').textContent).toContain('Weather');
  });

  it('should return correct weather data', () => {
    expect(component.currentWeather).toEqual(stubCurrentWeather);
    expect(component.forecast).toEqual(stubForecast);
  });

  it('should return isDay = false', () => {
    expect(component.isDay).toBeFalse();
  });

});
