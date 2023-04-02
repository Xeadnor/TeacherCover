import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Profesor } from '../interfaces/profesor.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private profesorService: ProfesorService) {};
  
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      name: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    }, {updateOn: "submit"})
      
  }

  async onSubmit(){
    if(this.formLogin.controls["name"].value.length > 0 && this.formLogin.controls["password"].value.length > 0){
       let profesor = new Profesor(this.formLogin.controls["name"].value, this.formLogin.controls["password"].value);
      //intento de login
      
      
     // const response = await this.profesorService.addProfesor(profesor);
      const response = await this.profesorService.getProfesors().subscribe(profesores =>{
        console.log(profesores)
      });
        //comprobar base de datos
        //var mensaje = "Error al encontrar una cuenta"
        //const mensajeError = document.getElementById('mensajeErrorLogin');
        //mensajeError!.textContent = mensaje;
    }else{
    }
  }

  }