import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent implements OnInit {
  createTeacherForm: FormGroup;
  rol: String;
  guardiaLunes: number;
  guardiaMartes: number;
  guardiaMiercoles: number;
  guardiaJueves: number;
  guardiaViernes: number;
  guardiaLunesApoyo: number;
  guardiaMartesApoyo: number;
  guardiaMiercolesApoyo: number;
  guardiaJuevesApoyo: number;
  guardiaViernesApoyo: number;
  registro: boolean;


  constructor(private router: Router, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };

  @ViewChild('f') f: NgForm
  ngOnInit(): void {

    this.registro = false;
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.rol = profesor["role"]
    if (this.rol != "Admin") {
      this.router.navigate(["/pagina/calendario"]);
    }


    this.createTeacherForm = new FormGroup({
      nombreProf: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      lunesGuardia: new FormControl("", Validators.required),
      martesGuardia: new FormControl("", Validators.required),
      miercolesGuardia: new FormControl("", Validators.required),
      juevesGuardia: new FormControl("", Validators.required),
      viernesGuardia: new FormControl("", Validators.required),
      lunesGuardiaApoyo: new FormControl("", Validators.required),
      martesGuardiaApoyo: new FormControl("", Validators.required),
      miercolesGuardiaApoyo: new FormControl("", Validators.required),
      juevesGuardiaApoyo: new FormControl("", Validators.required),
      viernesGuardiaApoyo: new FormControl("", Validators.required),

    }, { updateOn: "submit" });
  }



  changeLunesGuardia(e: any) {
    this.guardiaLunes = e.target.value
  }
  changeMartesGuardia(e: any) {
    this.guardiaMartes = e.target.value
  }
  changeMiercolesGuardia(e: any) {
    this.guardiaMiercoles = e.target.value
  }
  changeJuevesGuardia(e: any) {
    this.guardiaJueves = e.target.value
  }
  changeViernesGuardia(e: any) {
    this.guardiaViernes = e.target.value
  }

  changeLunesGuardiaApoyo(e: any) {
    this.guardiaLunesApoyo = e.target.value
  }
  changeMartesGuardiaApoyo(e: any) {
    this.guardiaMartesApoyo = e.target.value
  }
  changeMiercolesGuardiaApoyo(e: any) {
    this.guardiaMiercolesApoyo = e.target.value
  }
  changeJuevesGuardiaApoyo(e: any) {
    this.guardiaJuevesApoyo = e.target.value
  }
  changeViernesGuardiaApoyo(e: any) {
    this.guardiaViernesApoyo = e.target.value
  }

  async createTeacher() {
    let nombreProfe = this.createTeacherForm.controls["nombreProf"].value;
    let email = this.createTeacherForm.controls["email"].value;
    if (nombreProfe.length > 0 && email.length > 0 && this.guardiaLunes && this.guardiaMartes && this.guardiaMiercoles && this.guardiaJueves && this.guardiaViernes && this.guardiaLunesApoyo && this.guardiaMartesApoyo && this.guardiaMiercolesApoyo && this.guardiaJuevesApoyo && this.guardiaViernesApoyo) {
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
      if (regex.test(email)) {
        let profesor = new Profesor();
        let horasGuardia = new Map<string, number>([
          ["lunes", this.guardiaLunes],
          ["martes", this.guardiaMartes],
          ["miercoles", this.guardiaMiercoles],
          ["jueves", this.guardiaJueves],
          ["viernes", this.guardiaViernes],
        ]);
        let horasGuardiaApoyo = new Map<string, number>([
          ["lunes", this.guardiaLunesApoyo],
          ["martes", this.guardiaMartesApoyo],
          ["miercoles", this.guardiaMiercolesApoyo],
          ["jueves", this.guardiaJuevesApoyo],
          ["viernes", this.guardiaViernesApoyo],
        ]);

        let prueba = this.profesorService.getDataFromEmail(email);

        (await prueba).forEach(doc => {
          console.log()
          if (doc.length > 0) {
            if (this.registro) {

            } else {
              this.toastr.error("El correo introducido ya esta registrado", "Correo ya usado", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
            }
          } else {
            this.createTeacherForm.markAsPristine();
            this.createTeacherForm.markAsUntouched();
            let newId = this.profesorService.getNewId();
            newId.then(async (id) => {
              this.registro = true;
              //profesor creado
              profesor.setIdProfesor(id);
              profesor.setName(nombreProfe);
              profesor.setEmail(email);
              profesor.setHorarioGuardia(horasGuardia);
              profesor.setHorarioGuardiaApoyo(horasGuardiaApoyo);
              this.profesorService.addProfesor(profesor);

              await this.auth.registrar(email)
              this.f.resetForm();
              this.toastr.success("Se ha registrado con éxito el profesor en la base de datos", "Profesor creado", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
            });
          }
        })
      } else {
        //correo invalido
        this.toastr.error("El correo no cumple el formato correcto", "Correo no válido", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
      }

    } else {
      //campos obligatorios
      this.toastr.error("Se han de rellenar todos los campos", "Campos vacíos", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    }
  }


}
