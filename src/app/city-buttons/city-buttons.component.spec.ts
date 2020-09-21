import {ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import { CityButtonsComponent } from './city-buttons.component';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {cities} from '../../const/cities';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';



@Component({
  template: ''
})
class DummyComponent {

}

describe('CityButtonsComponent', () => {
  let component: CityButtonsComponent;
  let fixture: ComponentFixture<CityButtonsComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let citiesMap: Map<string, any>;

  beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
          imports: [
                    RouterTestingModule.withRoutes([
                      { path: 'daily/krasnodar', component: DummyComponent }
                    ])],
          declarations: [CityButtonsComponent, DummyComponent]
        }).compileComponents();
    }));

  beforeEach(() => {
    citiesMap = new Map(Object.entries(cities));
    fixture = TestBed.createComponent(CityButtonsComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    component.citiesMap = citiesMap;
    component.forecastMode = 'daily';
    component.currentCity = 'TAGANROG';
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display h2 header "choose city"',  () => {
    fixture.detectChanges();
    nativeEl = debugEl.query(By.css('h2')).nativeElement;
    expect(nativeEl.textContent).toContain('a city');
  });

  it('should display citie\'s name on buttons', () => {
    fixture.detectChanges();
    nativeEl = debugEl.query(By.css('button')).nativeElement;
    expect(nativeEl.textContent.toUpperCase()).toContain(citiesMap.keys().next().value);
  });

  it('should render all cities', () => {
      nativeEl = debugEl.nativeElement;
      expect(nativeEl.querySelectorAll('button').length).toBe(citiesMap.size);
  });

  it('should goto url', fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/daily/krasnodar');
    });
  })));
});
