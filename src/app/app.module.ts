import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ForecastComponent } from './forecast/forecast.component';
import { CityButtonsComponent } from './city-buttons/city-buttons.component';
import { ForecastModeComponent } from './forecast-mode/forecast-mode.component';
import {WeatherService} from './services/weather.service';
import {ErrorsInterceptor} from './interceptors/errors.interceptor';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherBlockComponent,
    ForecastComponent,
    CityButtonsComponent,
    ForecastModeComponent,
    CurrentWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
