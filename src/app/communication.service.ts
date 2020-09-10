import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private currentCity = new Subject<any>();

  constructor() { }

  currentCity$ = this.currentCity.asObservable();

  announceCurrentCity(currentCity: any) {
    this.currentCity.next(currentCity);
  }

}
