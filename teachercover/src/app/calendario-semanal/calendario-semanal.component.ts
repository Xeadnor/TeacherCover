import { Component } from '@angular/core';
import { Guardia } from '../interfaces/guardia.interface';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-calendario-semanal',
  templateUrl: './calendario-semanal.component.html',
  styleUrls: ['./calendario-semanal.component.css']
})
export class CalendarioSemanalComponent {
 meetings : Guardia[] = [
    {dayWeek: 1, hour: 11, description: "Guardia B-02",estado: "finished"},
    {dayWeek: 3, hour: 8, description: "Guardia A-21",estado: "to do"},
    {dayWeek: 2, hour: 13, description: "Guardia B-12",estado: "to do"},
    {dayWeek: 4, hour: 12, description: "Guardia A-04",estado: "selectable"},
  ]
  datesInWeek : Date[] = [];
  daysWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
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
  day : Date;
  hours : string[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.datesInWeek = this.utilsService.getDaysOfWeek(new Date());
    console.log(this.datesInWeek)
    this.day = new Date();
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
    const dayInWeek = this.daysWeek[date.getDay()];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }
  getMeeting(day: number, hour: number): string {
    const meeting = this.meetings.find(
      (el: Guardia) => el.dayWeek === day && el.hour === hour
    );

    return meeting ? meeting.description : '';
  }

  existsMeeting(day: number, hour: number): boolean {
    const meeting = this.meetings.find(
      (el: Guardia) => el.dayWeek === day && el.hour === hour
    );
    return meeting ? true : false;
  }
}
