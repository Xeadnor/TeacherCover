import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardia } from 'app/models/guardia.model';
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
       let day = new Date();
       let dia = day.getFullYear() + "/" + this.getMonthofToday(day.getMonth()) + "/" + day.getDate(); 
       this.guardiaService.getGuardiasPendientes(dia,parseInt(this.hora)).subscribe(guardias => {
        guardias.forEach((guardia) => {
          this.datos.push(new Guardia(guardia["horaGuardia"], new Date(guardia["fecha"]), guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"], guardia["nombreProfesor"], guardia["profesor"], guardia["idFIeld"], guardia["profesorCubierto"],guardia["tipo"]));

        })
      });
      console.log(this.datos);
      console.log(dia);
    });
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
