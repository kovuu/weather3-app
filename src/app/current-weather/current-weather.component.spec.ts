import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherComponent } from './current-weather.component';
import {Weather} from "../entities/weather";
import {SimpleChange, SimpleChanges} from "@angular/core";

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let nativeEl: HTMLElement;

  const stubCurrentWeather: Weather = {
    temp: 22,
    icon: '01d',
    weather: 'Cloud',
    city: 'Krasnodar',
    date: 1600624775221
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    component.currentWeather = stubCurrentWeather;
    component.isDay = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header h2', () => {
    nativeEl = fixture.nativeElement.querySelector('h2');
    expect(nativeEl.textContent).toContain('Current Weather');
  });

  it('should get correct weather Data', () => {
    expect(component.currentWeather).toEqual(stubCurrentWeather);
  });

  it('should  call ngOnChanges', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();

    const previousValue = ('2016-03-01T01:00:00Z');
    const currentValue = ('2016-02-28T01:00:00Z');

    const changesObj: SimpleChanges = {
      prop1: new SimpleChange(previousValue, currentValue, true)
    };

    component.ngOnChanges(changesObj);
    expect(component.ngOnChanges).toHaveBeenCalled();
  });
});
