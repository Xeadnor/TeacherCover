import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardia } from 'app/models/guardia.model';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { GuardiaService } from 'app/services/guardia.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-guardia',
  templateUrl: './editar-guardia.component.html',
  styleUrls: ['./editar-guardia.component.css']
})
export class EditarGuardiaComponent implements OnInit {
  createOnCallForm: FormGroup;
  rol: string;
  idGuardia: number;
  profesorCubierto: string;
  guardiaFecha: Date;
  diaGuardia: string;
  guardiaHora: number;
  horaGuardia: string;
  aulaGuardia: string;
  infoGuardia: string;
  cursoGuardia: string;
  letraCurso: string;
  nombreProfesor: string;
  profesor: number;
  tipo:string;
  estado: string;
  mostrados: boolean;

  constructor(private route: ActivatedRoute,private router: Router, private guardiaService: GuardiaService, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };
  
  
  ngOnInit() {
    this.mostrados = true;
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.rol = profesor["role"]
    if (this.rol != "Admin") {
    this.createOnCallForm = new FormGroup({
      profesorCubierto: new FormControl({value:"Rocio",disabled:true}, Validators.required),
      guardiaFecha: new FormControl({value:"23/04/2023",disabled:true}, Validators.required),
      guardiaHora: new FormControl({value:"10",disabled:true}, Validators.required),
      aulaGuardia: new FormControl({value:"B-03",disabled:true}, Validators.required),
      infoGuardia: new FormControl(),
      cursoGuardia: new FormControl({value:"4",disabled:true}, Validators.required),
      letraCurso:new FormControl({value:"A",disabled:true}, Validators.required)
    }, { updateOn: "submit" });

    }else{
      this.createOnCallForm = new FormGroup({
        profesorCubierto: new FormControl("Rocio", Validators.required),
        guardiaFecha: new FormControl("23/04/2023", Validators.required),
        guardiaHora: new FormControl("10", Validators.required),
        aulaGuardia: new FormControl("B-03", Validators.required),
        infoGuardia: new FormControl(),
        cursoGuardia: new FormControl("4", Validators.required),
        letraCurso:new FormControl("A", Validators.required)
      }, { updateOn: "submit" });

    }

    

  }




  changeHoraGuardia(e:any){
    this.guardiaHora = e.target.value
  }

  changeCursoGuardia(e:any){
    this.cursoGuardia = e.target.value
  }

  changeLetraCurso(e:any){
    this.letraCurso = e.target.value
  }

  //TODO mirar si hay alguna forma de obtener el valor del select del formulario y ahorrarse estos switch
  obtenerTextoHora(hora: string): string{
    let texto= ""
    switch (hora) {
      case "8":
        texto="Primera hora"
        break;
      case "9":
        texto="Segunda hora"
        break;
      case "10":
        texto="Tercera hora"
        break;
      case "11":
        texto="Recreo"
        break;
      case "12":
        texto="Cuarta hora"
        break;
      case "13":
        texto="Quinta hora"
        break;
      case "14":
        texto="Sexta hora"
        break;
      default:
        break;
    }
    return texto ;
  }

  obtenerTextoCurso(curso: string): string{
    let texto= ""
    switch (curso) {
      case "1":
        texto="1º ESO-"
        break;
      case "2":
        texto="2º ESO-"
        break;
      case "3":
        texto="3º ESO-"
        break;
      case "4":
        texto="4º ESO-"
        break;
      case "1B":
        texto="1º Bachiller-"
        break;
      case "2B":
        texto="2º Bachiller-"
        break;
      case "1FPB":
        texto="1º FP Básica-"
        break;
      case "2FPB":
        texto="2º FP Básica-"
        break;
      case "1SMR":
        texto="1º FPGM - SMR-"
        break;
      case "2SMR":
        texto="2º FPGM - SMR-"
        break;
      case "1TEGU":
        texto="1º FPGM - TEGU-"
        break;
      case "2TEGU":
        texto="2º FPGM - TEGU-"
        break;
      case "1DAW":
        texto="1º FPGS - DAW"
        break;
      case "2DAW":
        texto="2º FPGS - DAW"
        break;
      case "1DAM":
        texto="1º FPGS - DAM"
        break;
      case "2DAM":
        texto="2º FPGS - DAM"
        break;
      case "1TSEAS":
        texto="1º FPGS - TSEAS-"
        break;
      case "2TSEAS":
        texto="2º FPGS - TSEAS-"
        break;
      default:
        break;
    }
    return texto ;
  }

    obtenerTextoLetra(letra: string): string{
      let texto= ""
      switch (letra) {
        case "A":
        case "B":
        case "C":
        case "D":
          texto=letra
          break;
        case "Du":
          texto="Dual"
          break;
        case "Di":
          texto="Diurno"
          break;
        case "V":
          texto="Vespertino"
          break;
        case "U":
          texto="Curso línea única"
          break;
        default:
          break;
      }
      return texto ;
    }

  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = fecha.getDay();
    return diasSemana[indiceDia];
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

  refrescarFormulario(){

  }

  async createOnCall() {
    let nombreProfe = this.createOnCallForm.controls["profesorCubierto"].value;
    let aula= this.createOnCallForm.controls["aulaGuardia"].value;
    let dateSelectedMilisec= this.createOnCallForm.get("guardiaFecha")?.value;
    const fecha = new Date(dateSelectedMilisec);
    const fechaFormateada = fecha.toLocaleDateString('es-ES');

    if (nombreProfe.length > 0 && fechaFormateada.length > 0 && this.guardiaHora && aula.length>0 && this.cursoGuardia && this.letraCurso) {

        let guardia = new Guardia();
        let prueba = this.guardiaService.checkIfExistOnCall(nombreProfe, fecha , this.guardiaHora );
        let descripcion= this.createOnCallForm.controls["infoGuardia"].value;
      

        (await prueba).forEach(doc => {
          if (doc.length == 0) {
            this.createOnCallForm.markAsPristine();
            this.createOnCallForm.markAsUntouched();
            let newId = this.guardiaService.getNewId();
            newId.then(async (id) => {
              guardia.setIdGuardia(id);
              guardia.setEstado("Pendiente");
              guardia.setFecha(fecha);
              guardia.setHora(this.guardiaHora);
              guardia.setHoraGuardia(this.obtenerTextoHora("" + this.guardiaHora));
              guardia.setDia(this.obtenerDiaSemana(fecha));
              console.log(descripcion);
              if(descripcion == null){
                descripcion = "No hay información adicional"
              }
              guardia.setDescripcion(descripcion);
              guardia.setAula(aula);
              guardia.setProfesor(1);
              guardia.setNombreProfesor("Sin asignar");
              guardia.setCurso(this.obtenerTextoCurso(this.cursoGuardia) + " " + this.obtenerTextoLetra(this.letraCurso));
              guardia.setProfesorCubierto(nombreProfe);
              guardia.setTipo("Pendiente");
              guardia.setIncidencia(false);
              let dia = fecha.getFullYear() + "/" + this.getMonthofToday(fecha.getMonth()) + "/" + fecha.getDate(); 
              this.guardiaService.addGuardia(guardia,dia);
              this.toastr.success("Se ha registrado con éxito la guardia en la base de datos", "Guardia creada", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
              setTimeout(() => {
                // Recargar la página
                window.location.reload();
              }, 3000);

            });

          }else{
            this.toastr.error("Ya existe una gaurdia con los mismos parámetros", "Guardia existente", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
          }
        })

    } else {
      this.toastr.error("Se han de rellenar todos los campos obligatorios", "Campos vacíos", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    }
  }







}
