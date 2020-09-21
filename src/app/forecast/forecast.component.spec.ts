import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForecastComponent} from './forecast.component';
import {Forecast} from '../entities/forecast';
import {TypeOfCall} from '../../enums/typeOfCall';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let nativeEl: HTMLElement;

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
      declarations: [ ForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    component.forecastOutputData = stubForecast;
    component.TypeOfCallEnum = TypeOfCall;
    component.typeOfCall = TypeOfCall.DAILY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 header', () => {
    expect(nativeEl.querySelector('h2').textContent).toContain('Forecast');
  });

  it('should get correct forecast data', () => {
    expect(component.forecastOutputData).toEqual(stubForecast);
  });

  it('should correct render forecast', () => {
    const weatherBlocks = nativeEl.querySelectorAll('.weather-block');
    expect(weatherBlocks.length).toBe(stubForecast.length);

    const weatherBlock = weatherBlocks[0];
    expect(weatherBlock.className).toContain(component.isDay(stubForecast[0].date) ? 'day' : 'night');
    expect(weatherBlock.querySelector('.weather-info').textContent).toBe(stubForecast[0].weather);
    expect(weatherBlock.querySelector('.temp').textContent).toContain(stubForecast[0].temp.toString());
    expect(weatherBlock.querySelector('img').src).toContain(stubForecast[0].icon);
    const date = new Date(stubForecast[0].date);
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    expect(weatherBlock.querySelector('.date').textContent).toBe(date.getHours() + ':' + minutes);
  });
});
