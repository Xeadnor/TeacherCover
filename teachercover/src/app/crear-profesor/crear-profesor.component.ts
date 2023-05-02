import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesor } from 'app/models/profesor.model';

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

  constructor(private router: Router) { };

  ngOnInit(): void {

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

  changeLunesApoyoGuardia(e: any) {
    this.guardiaLunesApoyo = e.target.value
  }
  changeMartesApoyoGuardia(e: any) {
    this.guardiaMartesApoyo = e.target.value
  }
  changeMiercolesApoyoGuardia(e: any) {
    this.guardiaMiercolesApoyo = e.target.value
  }
  changeJuevesApoyoGuardia(e: any) {
    this.guardiaJuevesApoyo = e.target.value
  }
  changeViernesApoyoGuardia(e: any) {
    this.guardiaViernesApoyo = e.target.value
  }

  createTeacher() {
    let emailLogin = this.createTeacherForm.controls["nombreProf"].value;
    let password = this.createTeacherForm.controls["email"].value;
    console.log(emailLogin.length)
    console.log(password.length)
    if (emailLogin.length > 0 && password.length > 0 && this.guardiaLunes && this.guardiaMartes && this.guardiaMiercoles && this.guardiaJueves && this.guardiaViernes) {
      console.log("entra")
    } else {



    }
  }


}
