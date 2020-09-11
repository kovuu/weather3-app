import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TypeOfCall} from '../../enums/typeOfCall';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent  {


  @Input()
  TypeOfCallEnum: any;


  @Input()
    typeOfCall: TypeOfCall;

  @Input()
    forecastOutputData: any;

  @Input()
    isDay: any;







}
