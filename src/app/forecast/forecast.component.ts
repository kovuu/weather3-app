import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TypeOfCall} from '../../enums/typeOfCall';
import {Forecast} from "../entities/forecast";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent {


  @Input()
  TypeOfCallEnum: any;


  @Input()
    typeOfCall: TypeOfCall;

  @Input()
    forecastOutputData: Forecast[];



  isDay(timestamp): boolean {
    const date = new Date(timestamp);
    const hour = date.getHours();
    return (hour < 18 && hour > 5);
  }



}
