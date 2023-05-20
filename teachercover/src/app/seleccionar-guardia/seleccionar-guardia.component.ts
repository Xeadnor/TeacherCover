import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardia } from 'app/models/guardia.model';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { GuardiaService } from 'app/services/guardia.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seleccionar-guardia',
  templateUrl: './seleccionar-guardia.component.html',
  styleUrls: ['./seleccionar-guardia.component.css']
})
export class SeleccionarGuardiaComponent implements OnInit, OnDestroy  {
   private sub: any;
  tipoGuardia: string;
  hora: string;
  datos: Guardia[] = [];

  constructor(private guardiaService: GuardiaService,private route: ActivatedRoute,private router: Router, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };

  ngOnInit() {
   

    this.sub = this.route.params.subscribe(params => {
       this.tipoGuardia =params['tipo']; 
       this.hora =params['hora'];
       var day = new Date();
       let thisHour = day.getHours();
       if(day.getHours() == 8 && day.getMinutes() <25){
         thisHour = 7;
       }else if(day.getHours() == 9 && day.getMinutes() < 20){
         thisHour = 8;
       }
       else if(day.getHours() == 10 && day.getMinutes() <15){
         thisHour = 9;
       }
       else if(day.getHours() == 11 && day.getMinutes() <5){
         thisHour = 10;
       }
       else if(day.getHours() == 11 && day.getMinutes() >=30){
         thisHour = 12;
       }
       else if(day.getHours() == 12 && day.getMinutes() >= 20){
         thisHour = 13;
       }
       else if(day.getHours() == 13 && day.getMinutes() >=15){
         thisHour = 14;
       }
       else if(day.getHours() == 14 && day.getMinutes() >=5){
         thisHour = 15;
       }
       if(parseInt(this.hora) != thisHour){
        this.router.navigate(["/pagina/calendario"]);
       }else{

       }
       let dia = day.getFullYear() + "/" + this.getMonthofToday(day.getMonth()) + "/" + day.getDate(); 
       this.guardiaService.getGuardiasPendientes(dia,parseInt(this.hora)).subscribe(guardias => {
        this.datos.splice(0)
        guardias.forEach((guardia) => {
          this.datos.push(new Guardia(guardia["horaGuardia"], new Date(guardia["fecha"]), guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"], guardia["nombreProfesor"], guardia["profesor"], guardia["idFIeld"], guardia["profesorCubierto"],guardia["tipo"]));

        })
      });
    
    });
    this.ngOnDestroy()

  }

  ngOnChanges(changes: SimpleChanges){

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMonthofToday(mes: number){
    let numeroMes = mes + 1;
    let devolverMes;
    if(numeroMes < 10){
      devolverMes = "0" + numeroMes;
    }else{
      devolverMes = numeroMes;
    }

    return devolverMes;
  }
}
