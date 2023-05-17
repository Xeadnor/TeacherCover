import { Component, Input } from '@angular/core';
import { Guardia } from '../models/guardia.model';
import { UtilsService } from '../services/utils.service';
import { GuardiaService } from '../services/guardia.service';
import { Profesor } from 'app/models/profesor.model';
import { ProfesorService } from 'app/services/profesor.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  meetings: Guardia[] = [

  ]
  horarioGuardias : Map<String,Number>;
  horarioGuardiasApoyo : Map<String,Number>;
  datesInWeek: Date[] = [];
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
  day: Date;
  hours: string[] = [];
  botonFichar: boolean;
  tipoGuardia: string;
  horaGuardia: string;
   estamosEnFichar:boolean
  constructor(private utilsService: UtilsService,private toastr: ToastrService, private guardiaService: GuardiaService,private profesorService: ProfesorService,private router: Router,private route: ActivatedRoute) {

  }

  async ngOnInit() {
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
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    let email = profesor["email"]
    const prueba = (await this.profesorService.getDataFromEmail(email)).subscribe(profesor =>{
      this.horarioGuardias = profesor[0]["horarioGuardias"];
      this.horarioGuardiasApoyo = profesor[0]["horarioGuardiasApoyo"]
    }
    );
    this.reloadCurrentRoute()
  }


    reloadCurrentRoute() {
      this.estamosEnFichar = false;
      this.tipoGuardia = "nada";
      let dia = new Date();
      let thisHour = dia.getHours();
      let thisMinutes = dia.getMinutes();
      let siguienteHora = new Date();
        if(thisHour <= 8 && thisMinutes < 25){
          siguienteHora.setHours(8)
          siguienteHora.setMinutes(25)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }else if((thisHour == 9 && thisMinutes < 20)  || (thisHour == 8 && thisMinutes >=25)){
          siguienteHora.setHours(9)
          siguienteHora.setMinutes(20)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 9 && thisMinutes >= 15) || (thisHour == 10 && thisMinutes < 15)){
          siguienteHora.setHours(10)
          siguienteHora.setMinutes(15)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 10 && thisMinutes  >= 15)||(thisHour == 11 && thisMinutes  < 5)){

          siguienteHora.setHours(11)
          siguienteHora.setMinutes(5)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 11 && thisMinutes  >= 5 && thisMinutes <30)||(thisHour == 11 && thisMinutes  < 30)){
   
          siguienteHora.setHours(11)
          siguienteHora.setMinutes(30)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 11 && thisMinutes  >= 30)||(thisHour == 12 && thisMinutes  < 20)){

          siguienteHora.setHours(12)
          siguienteHora.setMinutes(20)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 12 && thisMinutes  >= 20)||(thisHour == 13 && thisMinutes  < 15)){
          siguienteHora.setHours(13)
          siguienteHora.setMinutes(15)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }
        else if((thisHour == 13 && thisMinutes  >= 15)||(thisHour == 14 && thisMinutes  < 5)){
          siguienteHora.setHours(14)
          siguienteHora.setMinutes(5)
          siguienteHora.setSeconds(0)
          siguienteHora.setMilliseconds(0)
        }else{
          siguienteHora.setHours(dia.getHours()+1)

        }
        setTimeout(() => {

          if(siguienteHora.getHours() == 8 && siguienteHora.getMinutes() <25){
         siguienteHora.setHours(7);
          }else if(siguienteHora.getHours() == 9 && siguienteHora.getMinutes() < 20){
            siguienteHora.setHours(8);
          }
          else if(siguienteHora.getHours() == 10 && siguienteHora.getMinutes() <15){
            siguienteHora.setHours(9);
          }
          else if(siguienteHora.getHours() == 11 && siguienteHora.getMinutes() <5){
            siguienteHora.setHours(10);

          }
          else if(siguienteHora.getHours() == 11 && siguienteHora.getMinutes() >=30){
            siguienteHora.setHours(12);

          }
          else if(siguienteHora.getHours() == 12 && siguienteHora.getMinutes() >= 20){
            siguienteHora.setHours(13);

          }
          else if(siguienteHora.getHours() == 13 && siguienteHora.getMinutes() >=15){
            siguienteHora.setHours(14)
          }
          else if(siguienteHora.getHours() == 14 && siguienteHora.getMinutes() >=5){
            siguienteHora.setHours(15);
          }
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['./'],{relativeTo: this.route})
          this.tipoGuardia = this.mostrarAlerta(siguienteHora.getHours());
           if(this.tipoGuardia == "guardia"){

             this.toastr.info("En esta hora tiene una guardia, compruebe sus datos","Hora de guardia",{timeOut:10000,closeButton:true,positionClass:"toast-top-right"})
            }else if(this.tipoGuardia == "apoyo"){
              this.toastr.info("En esta hora tiene una guardia de apoyo, compruebe sus datos","Hora de guardia de apoyo",{timeOut:10000,closeButton:true,positionClass:"toast-top-right"})
            }
            this.reloadCurrentRoute();

    

        }, siguienteHora.getTime() - dia.getTime());

  }


  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }

  getMeeting(hora: number): string {
    let tipo = ""
    let dia = new Date();
    let day = dia.getDay();

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

  existsMeeting( hora: number){
    let fijada = {};
    let dia = new Date();
    let day = dia.getDay();
    let thisHour = this.day.getHours();
    let thisMinutes = this.day.getMinutes();
    let estamosEnHora = false;
      if(thisHour == 8 && thisMinutes <25){
        thisHour = 7;
      }else if(thisHour == 9 && thisMinutes < 20){
        thisHour = 8;
      }
      else if(thisHour == 10 && thisMinutes <15){
        thisHour = 9;
      }
      else if(thisHour == 11 && thisMinutes <5){
        thisHour = 10;
      }
      else if(thisHour == 11 && thisMinutes >=30){
        thisHour = 12;
      }
      else if(thisHour == 12 && thisMinutes >= 20){
        thisHour = 13;
      }
      else if(thisHour == 13 && thisMinutes >=15){
        thisHour = 14;
      }
      else if(thisHour == 14 && thisMinutes >=5){
        thisHour = 15;
      }

    if(thisHour == hora){
  
      fijada = {"border-color":"orange","border-width":"2.5px"};
      estamosEnHora = true;


    }else{


      fijada = {"border-color":"grey"};
      
    }





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
        if(estamosEnHora == true){
          this.tipoGuardia = "guardia";
          this.horaGuardia = hora.toString();
          this.estamosEnFichar = true;
          
      this.botonFichar = true;
          fijada = {"background-color":"lightblue","border-color":"orange","border-width":"2.5px"};
        }else{
          this.botonFichar = false;

          fijada = {"background-color":"lightblue","border":"1px solid rgb(91,91,248"};
          
        }

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
        if(estamosEnHora == true){
          this.horaGuardia = hora.toString();

          this.botonFichar = true;
          this.tipoGuardia = "apoyo";
          fijada = {"background-color":"khaki","border-color":"orange","border-width":"2.5px"};
        }else{


          if(this.estamosEnFichar == true){
          }else{
            this.botonFichar = false;
          }
          fijada = {"background-color":"khaki","border":"1px solid rgb(91,91,248"};

        }
      }
    });


    return fijada;
  }



  mostrarAlerta( hora: number){
     let valor = "nada";
    let dia = new Date();
    let day = dia.getDay();
    let thisHour = this.day.getHours();
    let thisMinutes = this.day.getMinutes()+1;
    let estamosEnHora = false;

      if(thisHour == 8 && thisMinutes <25){
        thisHour = 7;
      }else if(thisHour == 9 && thisMinutes < 20){
        thisHour = 8;
      }
      else if(thisHour == 10 && thisMinutes <15){
        thisHour = 9;
      }
      else if(thisHour == 11 && thisMinutes <5){
        thisHour = 10;
      }
      else if(thisHour == 11 && thisMinutes >=30){
        thisHour = 12;
      }
      else if(thisHour == 12 && thisMinutes >= 20){
        thisHour = 13;
      }
      else if(thisHour == 13 && thisMinutes >=15){
        thisHour = 14;
      }
      else if(thisHour == 14 && thisMinutes >=5){
        thisHour = 15;
      }

    if(thisHour == hora){
      estamosEnHora = true;


    }else{
   
    }





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


      if (day == dia && thisHour == value){
        if(estamosEnHora == true){
      this.botonFichar = true;
        
        }else{
      this.botonFichar = false;
        }
      }else{

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


      if (day == dia && thisHour == value){
        if(estamosEnHora == true){
      this.botonFichar = true;
          
          valor = "apoyo";
        }else{
          this.botonFichar = false;


        }
      }
    });


    return valor;
  }




  seleccionarGuardia(){
    this.router.navigate(['/pagina/seleccionarGuardia',this.tipoGuardia,this.horaGuardia]);

  }









}
