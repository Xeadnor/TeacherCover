import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  convertUTCDateToLocalDate(date: Date) {
    var localDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return localDateTime;
  }

  getDaysOfWeek(date: Date) {
    const currentDayInWeek = date.getDay();
    const diffToStartWeek =
      date.getDate() - currentDayInWeek + (currentDayInWeek == 0 ? -6 : 1);

    const dateInLocalDateTime = this.convertUTCDateToLocalDate(
      new Date(date.setDate(diffToStartWeek))
    );

    const datesInWeek = [dateInLocalDateTime];
    for (let index = 1; index < 5; index++) {
      const dateInLocalDateTime = this.convertUTCDateToLocalDate(
        new Date(date.setDate(diffToStartWeek + index))
      );
      datesInWeek.push(dateInLocalDateTime);
    }

    return datesInWeek;
  }
}
