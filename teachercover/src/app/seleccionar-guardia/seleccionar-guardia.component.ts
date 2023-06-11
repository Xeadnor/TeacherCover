import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardia } from 'app/models/guardia.model';
import { Profesor } from 'app/models/profesor.model';
import { PaginaComponent } from 'app/pagina/pagina.component';
import { AuthService } from 'app/services/auth.service';
import { GuardiaService } from 'app/services/guardia.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seleccionar-guardia',
  templateUrl: './seleccionar-guardia.component.html',
  styleUrls: ['./seleccionar-guardia.component.css']
})
export class SeleccionarGuardiaComponent implements OnInit, OnDestroy {
  private sub: any;
  tipoGuardia: string;
  guardiaHacer: Guardia;
  profesor: Profesor
  elegido: boolean;
  hora: string;
  horaTexto: string;
  datos: Guardia[] = [];
  diaA: String;
  soyApoyo: boolean;
  noHayGuardias: boolean;
  constructor(private guardiaService: GuardiaService, private route: ActivatedRoute, private router: Router, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };

  ngOnInit() {
    this.soyApoyo = false;
    this.noHayGuardias = false;
    this.elegido = false;

    this.sub = this.route.params.subscribe(params => {
      this.tipoGuardia = params['tipo'];
      this.hora = params['hora'];
      if(this.tipoGuardia == "apoyo"){

        this.espera()
      }
      var day = new Date();
      this.diaA = day.getFullYear() + "/" + this.getMonthofToday(day.getMonth()) + "/" + day.getDate();
      let thisHour = day.getHours();
      if (day.getHours() == 8 && day.getMinutes() < 25) {
        thisHour = 7;
      } else if (day.getHours() == 9 && day.getMinutes() < 20) {
        thisHour = 8;
      }
      else if (day.getHours() == 10 && day.getMinutes() < 15) {
        thisHour = 9;
      }
      else if (day.getHours() == 11 && day.getMinutes() < 5) {
        thisHour = 10;
      }
      else if (day.getHours() == 11 && day.getMinutes() >= 30) {
        thisHour = 12;
      }
      else if (day.getHours() == 12 && day.getMinutes() >= 20) {
        thisHour = 13;
      }
      else if (day.getHours() == 13 && day.getMinutes() >= 15) {
        thisHour = 14;
      }
      else if (day.getHours() == 14 && day.getMinutes() >= 5) {
        thisHour = 15;
      }
      if (parseInt(this.hora) != thisHour) {
        this.router.navigate(["/pagina/calendario"]);
      } else {

      }
      let userJson = sessionStorage.getItem('profesor');
      this.profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
      let dia = day.getFullYear() + "/" + this.getMonthofToday(day.getMonth()) + "/" + day.getDate();
      this.guardiaService.getGuardiasPendientes(dia, parseInt(this.hora)).subscribe(guardias => {
        this.datos.splice(0)
        guardias.forEach((guardia) => {
          if (guardia["profesor"] == this.profesor["id"]) {
            this.elegido = true;
          }
          this.datos.push(new Guardia(guardia["horaGuardia"], new Date(guardia["fecha"]), guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"], guardia["nombreProfesor"], guardia["profesor"], guardia["idProfesorCubierto"], guardia["idFIeld"], guardia["profesorCubierto"], guardia["tipo"], guardia["incidencia"], guardia["incidenciaTexto"]));


        })

        if (guardias.length == 0) {
          this.noHayGuardias = true;
        }
      });

    });
    this.ngOnDestroy()

  }
  espera() {
    let dia = new Date();
    let thisMinutes = dia.getMinutes();
    let thisHour = dia.getHours();
    let siguienteHora = new Date();

    switch (this.hora) {
      case "8":
        if((thisMinutes >= 30 && thisHour == 8) || (thisHour == 9 && thisMinutes <20)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(8)
        siguienteHora.setMinutes(30)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)
        break;

      case "9":
        if((thisMinutes >= 25 && thisHour == 9) || (thisHour == 10 && thisMinutes <15)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(9)
        siguienteHora.setMinutes(25)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)
        break;

      case "10":
        if((thisMinutes >= 20 && thisHour == 10) || (thisHour == 11 && thisMinutes <5)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(10)
        siguienteHora.setMinutes(20)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)
        break;

      case "11":
        if((thisMinutes >= 10 && thisHour == 11) || (thisHour == 11 && thisMinutes <30)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(11)
        siguienteHora.setMinutes(10)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)
        break;

      case "12":
        if((thisMinutes >= 35 && thisHour == 11) || (thisHour == 12 && thisMinutes <20)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(11)
        siguienteHora.setMinutes(35)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)
        break;

      case "13":
        if((thisMinutes >= 25 && thisHour == 12) || (thisHour == 13 && thisMinutes <15)){
          this.soyApoyo = true;
        }
        siguienteHora.setHours(12)
        siguienteHora.setMinutes(25)
        siguienteHora.setSeconds(0)
        siguienteHora.setMilliseconds(0)

        break;

      case "14":

      if((thisMinutes >= 20 && thisHour == 13) || (thisHour == 14 && thisMinutes <5)){
        this.soyApoyo = true;
      }
      siguienteHora.setHours(13)
      siguienteHora.setMinutes(20)
      siguienteHora.setSeconds(0)
      siguienteHora.setMilliseconds(0)

        break;

      default:

        break;
    }
    if(this.soyApoyo == false){
      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'],{relativeTo: this.route})
        this.toastr.info("Como profesor de apoyo ya tiene permitido elegir una guardia","Profesores de apoyo",{timeOut:5000,closeButton:true,positionClass:"toast-top-right"})

      }, siguienteHora.getTime() - dia.getTime());
    }
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  calcularEstado(guardia: Guardia) {
    if (guardia.estado == "Finalizada") {
      return " Asignada "
    } else {
      return "Disponible"
    }

  }
  estiloEstado(guardia: Guardia) {
    let color = {};
    if (guardia.estado == "Finalizada") {
      color = { "color": "red" };

    } else {
      color = { "color": "green" };

    }

    return color;
  }
  comprobarGuardiaBoton(guardia: Guardia) {
    if (this.tipoGuardia == "apoyo" && !this.soyApoyo) {
      return true;
    } else if (guardia.estado == "Finalizada" || this.elegido) {
      return true;

    } else {
      return false;

    }


  }
  modalSeleccionar(guardia: Guardia) {
    this.guardiaHacer = guardia;
    var myModal: any = new (window as any).bootstrap.Modal(
      document.getElementById("seleccionarGuardia")
    );
    myModal.show()
  }
  hacerGuardia() {
    (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('seleccionarGuardia')).hide()
    let guardia: Guardia;
    guardia = this.guardiaHacer;
    let num = this.profesor["horasGuardias"] + 1;
    this.guardiaService.hacerGuardia(guardia, this.profesor, this.tipoGuardia, num)
    this.toastr.success("Se le ha asignado la guardia con número : " + guardia.getIdGuardia() + " ", "Guardia seleccionada", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    //window.location.reload();

  }




  seleccionada(guardia: Guardia) {
    if (guardia.nombreProfesor == "Sin asignar") {
      return false;
    } else {
      return true;
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMonthofToday(mes: number) {
    let numeroMes = mes + 1;
    let devolverMes;
    if (numeroMes < 10) {
      devolverMes = "0" + numeroMes;
    } else {
      devolverMes = numeroMes;
    }
    return devolverMes;
  }




}

