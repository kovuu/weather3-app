import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Forecast} from "../forecast";
import {TypeOfCall} from "../../enums/typeOfCall";
import {ActivatedRoute} from "@angular/router";
import {WeatherService} from "../weather.service";
import {CommunicationService} from "../communication.service";
import {cities} from "../../const/cities";

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
