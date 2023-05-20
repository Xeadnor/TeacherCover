import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Profesor } from 'app/models/profesor.model';
import { Guardia } from 'app/models/guardia.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GuardiaService } from 'app/services/guardia.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter } from '@angular/material/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-crear-guardia',
  templateUrl: './crear-guardia.component.html',
  styleUrls: ['./crear-guardia.component.css']
})
export class CrearGuardiaComponent implements OnInit {
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

  constructor(private router: Router, private guardiaService: GuardiaService, private toastr: ToastrService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek()
   };


  @ViewChild('f') f : NgForm
  ngOnInit(): void {

    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.rol = profesor["role"]
    if (this.rol != "Admin") {
      this.router.navigate(["/pagina/calendario"]);
    }


    this.createOnCallForm = new FormGroup({
      profesorCubierto: new FormControl("", Validators.required),
      guardiaFecha: new FormControl("", Validators.required),
      guardiaHora: new FormControl("", Validators.required),
      aulaGuardia: new FormControl("", Validators.required),
      infoGuardia: new FormControl(),
      cursoGuardia: new FormControl("", Validators.required),
      letraCurso:new FormControl("", Validators.required)
    }, { updateOn: "submit" });
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

  //TODO mirar si hay alguna forma de obtener el valor del select del formulario y ahorrarse esto
  obtenerTextoHora(hora: number): string{
    let texto= ""
    switch (hora) {
      case 8:
        texto="Primera hora"
        break;
      case 9:
        texto="Segunda hora"
        break;
      case 10:
        texto="Tercera hora"
        break;
      case 11:
        texto="Recreo"
        break;
      case 12:
        texto="Cuarta hora"
        break;
      case 13:
        texto="Quinta hora"
        break;
      case 14:
        texto="Sexta hora"
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



  async createOnCall() {
    let nombreProfe = this.createOnCallForm.controls["profesorCubierto"].value;
    let aula= this.createOnCallForm.controls["aulaGuardia"].value;
    let dateSelectedMilisec= this.createOnCallForm.get("guardiaFecha")?.value;
    const fecha = new Date(dateSelectedMilisec);
    const fechaFormateada = fecha.toLocaleDateString('es-ES');

    console.log(this.guardiaHora + " ---- hora")
    console.log(aula.length + " ---- aula")
    console.log(this.cursoGuardia + " ---- curso")
    console.log(this.letraCurso + " ---- letra")
    console.log(fecha + "fechaRaw")

    if (nombreProfe.length > 0 && fechaFormateada.length > 0 && this.guardiaHora && aula.length>0 && this.cursoGuardia && this.letraCurso) {

        let guardia = new Guardia();
        let prueba = this.guardiaService.checkIfExistOnCall(nombreProfe, fecha , this.guardiaHora );
        let descripcion="";
        this.infoGuardia!= null ? descripcion=this.infoGuardia : descripcion="Sin información adicional";

        (await prueba).forEach(doc => {
          if (doc.length > 0) {
            this.createOnCallForm.markAsPristine();
            this.createOnCallForm.markAsUntouched();
            let newId = this.guardiaService.getNewId();
            newId.then(async (id) => {
              guardia.setIdGuardia(id);
              guardia.setEstado("Pendiente");
              guardia.setFecha(fecha);
              guardia.setHora(this.guardiaHora);
              guardia.setHoraGuardia(this.obtenerTextoHora(this.guardiaHora));
              guardia.setDia(this.obtenerDiaSemana(fecha));
              guardia.setDescripcion(descripcion);
              guardia.setAula(aula);
              guardia.setProfesor(1);
              guardia.setNombreProfesor("");
              guardia.setCurso(this.cursoGuardia + " " + this.letraCurso);
              guardia.setProfesorCubierto(nombreProfe);
              guardia.setTipo("Pendiente");
              this.guardiaService.addGuardia(guardia);
              this.toastr.success("Se ha registrado con éxito la guardia en la base de datos", "Guardia creada", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
              window.location.reload();
            });
          }
        })

    } else {
      this.toastr.error("Se han de rellenar todos los campos", "Campos vacíos", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    }
  }

}
