import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityButtonsComponent } from './city-buttons.component';

describe('CityButtonsComponent', () => {
  let component: CityButtonsComponent;
  let fixture: ComponentFixture<CityButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
