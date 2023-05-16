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

  constructor(private router: Router, private guardiaService: GuardiaService, private toastr: ToastrService) { };


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


  async createOnCall() {
    let nombreProfe = this.createOnCallForm.controls["profesorCubierto"].value;
    if (nombreProfe.length > 0 && this.guardiaFecha && this.guardiaHora && this.aulaGuardia.length>0 && this.cursoGuardia && this.letraCurso) {
        let guardia = new Guardia();
        let prueba = this.guardiaService.checkIfExistOnCall(nombreProfe, this.guardiaFecha, this.guardiaHora);

        (await prueba).forEach(doc => {
          if (doc.length > 0) {
            this.createOnCallForm.markAsPristine();
            this.createOnCallForm.markAsUntouched();
            let newId = this.guardiaService.getNewId();
            newId.then(async (id) => {
              guardia.setIdGuardia(id);
              guardia.setProfesorCubierto(nombreProfe);
              guardia.setFecha(this.guardiaFecha);
              guardia.setHora(this.guardiaHora);
              guardia.setAula(this.aulaGuardia);
              guardia.setCurso(this.cursoGuardia);
              this.guardiaService.addGuardia(guardia);
              this.toastr.success("Se ha registrado con éxito la guardia en la base de datos", "Guardia creado", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
              window.location.reload();
            });
          }
        })

    } else {
      this.toastr.error("Se han de rellenar todos los campos", "Campos vacíos", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    }
  }

}
