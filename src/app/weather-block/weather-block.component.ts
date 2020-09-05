import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

enum ForecastMode {
    ONE_DAY= 25, THREE_DAYS = 24, WEEK= 7, CURRENT= 1
}

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.css']
})
export class WeatherBlockComponent implements OnInit {
  private WeatherData: any;
  CurrentWeatherData;
  OutputWeatherData = [];
  currentCity: string ;
  citiesList = new Map();
  forecastMode: ForecastMode = ForecastMode.ONE_DAY;
  // tslint:disable-next-line:typedef
  ForecastMode = ForecastMode;
  cityIsChanged = false;
  typeOfCallsMap = new Map();

  constructor() {}

  ngOnInit(): void {
    this.WeatherData = {
      flag: true,
    };
    this.CurrentWeatherData = {

    };

    this.typeOfCallsMap.set(this.ForecastMode.ONE_DAY, environment.oneCallApi);
    this.typeOfCallsMap.set(this.ForecastMode.THREE_DAYS, environment.forecastApi);
    this.typeOfCallsMap.set(this.ForecastMode.WEEK, environment.oneCallApi);
    this.typeOfCallsMap.set(this.ForecastMode.CURRENT, environment.currentWeatherApi);

    this.citiesList.set('Krasnodar', environment.KRASNODAR);
    this.citiesList.set('Taganrog', environment.TAGANROG);
    this.citiesList.set('Murmansk', environment.MURMANSK);
    this.citiesList.set('Vladivostok', environment.VLADIVOSTOK);
    this.citiesList.set('NewYork', environment.NEW_YORK);
    this.citiesList.set('Madrid', environment.MADRID);
    this.citiesList.set('Moscow', environment.MOSCOW);
    this.currentCity = 'Taganrog';
    this.updateWeatherData(this.typeOfCallsMap.get(this.ForecastMode.CURRENT));
    this.getForecastForMode(this.forecastMode);
  }
  // tslint:disable-next-line:typedef
  updateWeatherData(typeOfCall) {
    let url: string;
    // tslint:disable-next-line:triple-equals
    url = `${environment.serviceUrl}${typeOfCall}?lat=${this.citiesList.get(this.currentCity)[0]}&lon=${this.citiesList.get(this.currentCity)[1]}&appid=${environment.apiKey}&units=metric`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (typeOfCall === environment.currentWeatherApi) {
          this.setCurrentWeatherData(data);
        } else {
          this.setWeatherData(data);
        }
      })
      .then(() => {
        if (typeOfCall !== environment.currentWeatherApi) {
          this.getForecast(this.forecastMode);
        }
      }).catch((err) => console.log(err.message));
  }


  // tslint:disable-next-line:typedef
  setCurrentWeatherData(data) {
    Object.assign(this.CurrentWeatherData, this.constructWeatherObject(data, false, true));
  }


  // tslint:disable-next-line:typedef
  setWeatherData(data) {
    this.WeatherData = data;

  }

  // tslint:disable-next-line:typedef
  getForecast(type) {
    this.OutputWeatherData.length = 0;
    let count = 0;
    const endOfCount = type;
    const hourly = type === ForecastMode.ONE_DAY;
    // tslint:disable-next-line:max-line-length
    const currWeatherData = hourly ? this.WeatherData.hourly : this.forecastMode === ForecastMode.WEEK
                  ? this.WeatherData.daily : this.WeatherData.list;
    for (const day of  currWeatherData) {
      if (!hourly || (hourly && (count === 0 || count % 3 === 0))) {
        this.OutputWeatherData.push(this.constructWeatherObject(day , hourly, false));
      }
      count++;
      if (count === endOfCount) { break; }

    }
  }

  // tslint:disable-next-line:typedef
  constructWeatherObject(data, hourly , currentWeather = false) {

    let temp: number;
    let tempNight: number = null;
    if (hourly) {
        temp = data.temp;
      } else if (currentWeather || this.forecastMode === ForecastMode.THREE_DAYS) {
      temp = data.main.temp;
    }  else  {
      temp = data.temp.day;
      tempNight = data.temp.night.toFixed(0);
    }
    return {
      temp: temp.toFixed(0),
      tempNight,
      date: data.dt * 1000,
      icon: data.weather[0].icon,
      weather: data.weather[0].main,
      city: data.name
    };
  }

  // tslint:disable-next-line:typedef
  changeCity(city) {
    this.currentCity = city;
    this.cityIsChanged = true;
    this.updateWeatherData(this.typeOfCallsMap.get(this.ForecastMode.CURRENT));
    this.cityIsChanged = false;
    this.getForecastForMode(this.forecastMode);
  }



  // tslint:disable-next-line:typedef
  isDay(time) {
    return (time < 18 && time > 5);
  }


  // tslint:disable-next-line:typedef
  getForecastForMode(mode) {
    this.forecastMode = mode;
    // tslint:disable-next-line:max-line-length
    this.updateWeatherData(this.typeOfCallsMap.get(this.forecastMode));
  }
}

