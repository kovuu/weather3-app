import {Predicatable} from "./predicatable.utility";

describe('Predicatable', () => {
  let isHourlyForecast: boolean;
  let passedElements: number;

  it('should return true, if isn\'t hourly forecast', () => {
    isHourlyForecast = false;
    passedElements = 0;
    expect(Predicatable.needToPush(isHourlyForecast, passedElements)).toBeTrue();
  });

  it('should return true if passed elements = false or passed elements % 3 = 0', () => {
    isHourlyForecast = true;
    passedElements = 0;
    expect(Predicatable.needToPush(isHourlyForecast, passedElements)).toBeTrue();
    passedElements = 3;
    expect(Predicatable.needToPush(isHourlyForecast, passedElements)).toBeTrue();
  });

  it('should return false if hourlyForecast and passed elements not 0 or {el} % 3 = 0', () => {
    isHourlyForecast = true;
    passedElements = 1;
    expect(Predicatable.needToPush(isHourlyForecast, passedElements)).toBeFalse();
  });
});
