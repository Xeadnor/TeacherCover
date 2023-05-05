import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  convertUTCDateToLocalDate(date: Date) {
    var localDateTime = new Date(
      date.getTime() 
    );
    return localDateTime;
  }

  getDay(date: Date) {
    const currentDayInWeek = date.getDay();

    const datesInWeek = [];

      datesInWeek.push(date);


    return datesInWeek;
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
