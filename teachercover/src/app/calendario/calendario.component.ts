import { Component, Input } from '@angular/core';
import { Guardia } from '../models/guardia.model';
import { UtilsService } from '../services/utils.service';
import { GuardiaService } from '../services/guardia.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
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
    this.datesInWeek = this.utilsService.getDay(new Date());
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

  getMeeting( hora: number): string {
    let thisDay = this.day.getDay();
    const meeting = this.meetings.find(
      (el: Guardia) => el.diaSemana === thisDay && el.hora === hora
    );

    return meeting ? meeting.descripcion : ' ';
  }

  existsMeeting( hora: number): boolean {
    let thisDay = this.day.getDay();
    const meeting = this.meetings.find(
      (el: Guardia) => el.diaSemana === thisDay && el.hora === hora
    );
    console.log(meeting);
    return meeting ? true : false;
  }

  someFunction( hora: number){
    let thisDay = this.day.getDay();
    const meeting = this.meetings.find(
      (el: Guardia) => el.diaSemana === thisDay && el.hora === hora
    )?.estado;
    if(meeting){
      if(meeting == "Finalizada"){
          return "rgb(47, 224, 83)";
      }else if(meeting == "Pendiente"){
        return "rgb(255, 251, 10)"
      }else{
        return "lightblue";
      }
    }else{
      return "";
    }
  }
}
