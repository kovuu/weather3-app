import {ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import { ForecastModeComponent } from './forecast-mode.component';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {TypeOfCall} from "../../enums/typeOfCall";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

@Component({template: ''})
class DummyComponent {}

describe('ForecastModeComponent', () => {
  let component: ForecastModeComponent;
  let fixture: ComponentFixture<ForecastModeComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'daily/krasnodar', component: DummyComponent}]
      )],
      declarations: [ ForecastModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastModeComponent);
    component = fixture.componentInstance;
    component.typeOfCallMap = TypeOfCall;
    component.currentCity = 'KRASNODAR';
    fixture.detectChanges();
    debugEl = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should render 3 buttons and text inside button', () => {
      nativeEl = debugEl.nativeElement;
      expect(nativeEl.querySelectorAll('button').length).toBe(3);
      nativeEl = debugEl.query(By.css('button')).nativeElement;
      expect(nativeEl.textContent).toContain('One Day');
  });


  it('should render h2 header', () => {
    nativeEl = debugEl.nativeElement;
    expect(nativeEl.querySelector('h2').textContent).toContain('forecast');
  });

  it ('should go to url', fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable()
      .then(() => {
        expect(location.path()).toEqual('/daily/krasnodar');
      });
  })));

});
