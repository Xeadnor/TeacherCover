import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Profesor } from '../interfaces/profesor.interface';
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
    this.formLogin = new FormGroup({
      name: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    }, {updateOn: "submit"})
      
  }

  async onSubmit(){
    let name = this.formLogin.controls["name"].value;
    let password = this.formLogin.controls["password"].value;

    if(name.length > 0 && password.length > 0){

      const prueba = (await this.profesorService.Login(name,password)).subscribe(profesor =>{
        if(profesor.length > 0){
          let header = new HeaderComponent(this.router);
          header.mostrarNombre(profesor[0]["name"]);
          this.router.navigate(['/pagina']);
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
