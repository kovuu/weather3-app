import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forecast-mode',
  templateUrl: './forecast-mode.component.html',
  styleUrls: ['./forecast-mode.component.css']
})
export class ForecastModeComponent {

  @Input()
    currentCity: string;
  @Input()
    typeOfCall: any;
  @Input()
    typeOfCallMap: any;



}
