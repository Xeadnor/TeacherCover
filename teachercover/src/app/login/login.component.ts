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
    let name = this.formLogin.controls["name"].value;
    let password = this.formLogin.controls["password"].value;

    if(name.length > 0 && password.length > 0){
      // let profesor = new Profesor(name, password);
      //intento de login
      var mensaje = "Cuenta NO encontrada"
      const mensajeError = document.getElementById('mensajeErrorLogin');
      if(mensajeError!.textContent != "Cuenta NO encontrada" && mensajeError!.textContent != "Cuenta encontrada" )
      mensajeError!.textContent = mensaje;

      let prueba = this.profesorService.Login(name,password);
      (await prueba).forEach((doc) => {
       if(doc.data()["name"] == name && doc.data()["password"] == password){
         var mensaje = "Cuenta encontrada"
         const mensajeError = document.getElementById('mensajeErrorLogin');
         mensajeError!.textContent = mensaje;
       }
     });
      // prueba.then( res => console.log(res));
      
     // const response = await this.profesorService.addProfesor(profesor);
     // const response = await this.profesorService.getProfesors().subscribe(profesores =>{
     //   console.log(profesores)
     // });
      // const response = await this.profesorService.addProfesor(profesor); 
    
        //comprobar base de datos
        //var mensaje = "Error al encontrar una cuenta"
        //const mensajeError = document.getElementById('mensajeErrorLogin');
        //mensajeError!.textContent = mensaje;
    }else{
    }
  }

  }