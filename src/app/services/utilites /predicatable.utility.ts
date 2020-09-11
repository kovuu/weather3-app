export class Predicatable {

  static needToPush(isHourlyForecast: boolean, passedElements: number): boolean {
    if (!isHourlyForecast) {
      return true;
    } else if (!passedElements || !(passedElements % 3)) {
      return true;
    }
  }
}
