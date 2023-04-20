import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Profesor } from '../models/profesor.model';
import { RouterLink, Router,  } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private profesorService: ProfesorService, private router: Router) {};
  
  ngOnInit(): void {

    if(sessionStorage.length > 0){
      this.router.navigate(['/pagina/calendario']);
  }else{
    this.formLogin = new FormGroup({
      name: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    }, {updateOn: "submit"})

  }

      
  }

  async onSubmit(){
    let name = this.formLogin.controls["name"].value;
    let password = this.formLogin.controls["password"].value;

    if(name.length > 0 && password.length > 0){

      const prueba = (await this.profesorService.Login(name,password)).subscribe(profesor =>{
        if(profesor.length > 0){
          let newProf = new Profesor();
          newProf.setIdProfesor(profesor[0]["id"]);
          newProf.setName(profesor[0]["name"]);
          newProf.setPassword(profesor[0]["password"]);
          newProf.setEmail(profesor[0]["email"]);
          newProf.setHorasGuardais(profesor[0]["horasGuardias"]);
          newProf.setDiaGuardia(profesor[0]["diaGuardia"]);
          sessionStorage.setItem('profesor', JSON.stringify(newProf))
          this.router.navigate(['/pagina/calendario']);
        }else{
            var mensaje = "Los datos de ingreso no coinciden"
            const mensajeError = document.getElementById('mensajeErrorLogin');
            mensajeError!.textContent = mensaje;
        }
      }); 
    }
  }

  }
      
      
     // const response = await this.profesorService.addProfesor(profesor);
     // const response = await this.profesorService.getProfesors().subscribe(profesores =>{
     //   console.log(profesores)
     // });
      // const response = await this.profesorService.addProfesor(profesor); 
