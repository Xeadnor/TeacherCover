import { Component, Input } from '@angular/core';
import { Guardia } from '../interfaces/guardia.interface';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  meetings : Guardia[] = [
    {dayWeek: 1, hour: 11, description: "Guardia B-02"},
    {dayWeek: 3, hour: 8, description: "Guardia A-21"},
    {dayWeek: 4, hour: 13, description: "Guardia B-12"},
    {dayWeek: 4, hour: 12, description: "Guardia A-04"},
  ]
  datesInWeek : Date[] = [];
  daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
  ];

  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  hours : string[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.datesInWeek = this.utilsService.getDaysOfWeek(new Date());
    this.hours = [
      '8:25',
      '9:20',
      '10:15',
      '11:05',
      '11:30',
      '12:20',
      '13:15',
    ]
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay() - 1];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }

  getMeeting(day: number, hour: number): string {
    const meeting = this.meetings.find(
      (el: Guardia) => el.dayWeek === day && el.hour === hour
    );
      console.log(meeting);
    return meeting ? meeting.description : ' prueba';
  }

  existsMeeting(day: number, hour: number): boolean {
    const meeting = this.meetings.find(
      (el: Guardia) => el.dayWeek === day && el.hour === hour
    );
    return meeting ? true : false;
  }
}
