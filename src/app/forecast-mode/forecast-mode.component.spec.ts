import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastModeComponent } from './forecast-mode.component';

describe('ForecastModeComponent', () => {
  let component: ForecastModeComponent;
  let fixture: ComponentFixture<ForecastModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
