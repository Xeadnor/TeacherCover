import { Component } from '@angular/core';
import { Guardia } from '../models/guardia.model';
import { UtilsService } from '../services/utils.service';
import { GuardiaService } from '../services/guardia.service';

@Component({
  selector: 'app-calendario-semanal',
  templateUrl: './calendario-semanal.component.html',
  styleUrls: ['./calendario-semanal.component.css']
})
export class CalendarioSemanalComponent {
 meetings : Guardia[] = [

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

  constructor(private utilsService: UtilsService, private guardiaService: GuardiaService) {}

  ngOnInit() {
    this.datesInWeek = this.utilsService.getDaysOfWeek(new Date());
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
    this.guardiaService.getGuardias().subscribe(guardias => {
      guardias.forEach(element => this.meetings.push(new Guardia(element["diaSemana"],element["hora"],element["descripcion"],element["estado"],element["idGuardia"])));
     });
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }
  getMeeting(day: number, hora: number): string {
    const meeting = this.meetings.find(
      (el: Guardia) => el.diaSemana === day && el.hora === hora
    );

    return meeting ? meeting.descripcion : '';
  }

  existsMeeting(day: number, hora: number): boolean {
    const meeting = this.meetings.find(
      (el: Guardia) => el.diaSemana === day && el.hora === hora
    );
    return meeting ? true : false;
  }
}
