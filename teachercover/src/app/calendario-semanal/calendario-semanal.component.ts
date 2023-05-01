import { Component } from '@angular/core';
import { Guardia } from '../models/guardia.model';
import { UtilsService } from '../services/utils.service';
import { GuardiaService } from '../services/guardia.service';
import { Profesor } from 'app/models/profesor.model';
import { ProfesorService } from 'app/services/profesor.service';

@Component({
  selector: 'app-calendario-semanal',
  templateUrl: './calendario-semanal.component.html',
  styleUrls: ['./calendario-semanal.component.css']
})
export class CalendarioSemanalComponent {
  horarioGuardias : Map<String,Number>;
  horarioGuardiasApoyo : Map<String,Number>;
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

  constructor(private utilsService: UtilsService,private profesorService: ProfesorService) {}

  async ngOnInit() {
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
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    let email = profesor["email"]
    const prueba = (await this.profesorService.getDataFromEmail(email)).subscribe(profesor =>{
      this.horarioGuardias = profesor[0]["horarioGuardias"];
      this.horarioGuardiasApoyo = profesor[0]["horarioGuardiasApoyo"]
    }
    );

  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }
  getMeeting(day: number, hora: number): string {
    let tipo = ""
    Object.entries(this.horarioGuardias || {}).forEach(([key, value]) => {
      let dia = 0
      switch (key) {
        case "lunes": {
          dia = 1
          break;
        }
        case "martes": {
          dia = 2
          break;
        }
        case "miercoles": {
          dia = 3
          break;
        }
        case "jueves": {
          dia = 4
          break;
        }
        case "viernes": {
          dia = 5
          break;
        }
        default: {
          //statements; 
          break;
        }
      }


      if (day == dia && hora == value){
        tipo = "Guardia ordinaria";
      }
    });

    Object.entries(this.horarioGuardiasApoyo || {}).forEach(([key, value]) => {
      let dia = 0
      switch (key) {
        case "lunes": {
          dia = 1
          break;
        }
        case "martes": {
          dia = 2
          break;
        }
        case "miercoles": {
          dia = 3
          break;
        }
        case "jueves": {
          dia = 4
          break;
        }
        case "viernes": {
          dia = 5
          break;
        }
        default: {
          //statements; 
          break;
        }
      }


      if (day == dia && hora == value){
        tipo = "Guardia de apoyo";
      }
    });

    return tipo
  }

  existsMeeting(day: number, hora: number){
    let fijada = {};
    Object.entries(this.horarioGuardias || {}).forEach(([key, value]) => {
      let dia = 0
      switch (key) {
        case "lunes": {
          dia = 1
          break;
        }
        case "martes": {
          dia = 2
          break;
        }
        case "miercoles": {
          dia = 3
          break;
        }
        case "jueves": {
          dia = 4
          break;
        }
        case "viernes": {
          dia = 5
          break;
        }
        default: {
          //statements; 
          break;
        }
      }


      if (day == dia && hora == value){
        fijada = {"background-color":"lightblue","border":"1px solid rgb(91,91,248"};
      }
    });

    Object.entries(this.horarioGuardiasApoyo || {}).forEach(([key, value]) => {
      let dia = 0
      switch (key) {
        case "lunes": {
          dia = 1
          break;
        }
        case "martes": {
          dia = 2
          break;
        }
        case "miercoles": {
          dia = 3
          break;
        }
        case "jueves": {
          dia = 4
          break;
        }
        case "viernes": {
          dia = 5
          break;
        }
        default: {
          //statements; 
          break;
        }
      }


      if (day == dia && hora == value){
        fijada = {"background-color":"khaki","border":"1px solid rgb(91,91,248"};
      }
    });

    
    return fijada;
  }
}

