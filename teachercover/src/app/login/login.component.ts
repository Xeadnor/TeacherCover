import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Profesor } from '../models/profesor.model';
import { RouterLink, Router,  } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formNewUser: FormGroup;
  constructor(private profesorService: ProfesorService, private router: Router, private toastr: ToastrService) {};
  changepassword : boolean;
  nuevaPassword : String;
  idFieldProfesor: String;
  nombreProfesor : String;
  ngOnInit(): void {
    this.changepassword = false;
    if(sessionStorage.length > 0){
      this.router.navigate(['/pagina/calendario']);
  }else{
    this.formLogin = new FormGroup({
      emailLogin: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    }, {updateOn: "submit"})
    this.formNewUser = new FormGroup({
      newPassword: new FormControl("",Validators.required),
      repeatPassword: new FormControl("",Validators.required)

    }, {updateOn: "submit"})

  }

      
  }

  async onSubmit(){
    let emailLogin = this.formLogin.controls["emailLogin"].value;
    let password = this.formLogin.controls["password"].value;
    if(password == "IESinfanta23"){

    }else{
      password = window.btoa(this.formLogin.controls["password"].value);

    }
     let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(emailLogin.length > 0 && password.length > 0){
      if(regex.test(this.formLogin.controls["emailLogin"].value)){
        const prueba = (await this.profesorService.Login(emailLogin,password)).subscribe(profesor =>{
          if(profesor.length > 0){
  
            let newProf = new Profesor();
            newProf.setIdProfesor(profesor[0]["id"]);
            newProf.setName(profesor[0]["name"]);
            newProf.setPassword(profesor[0]["password"]);
            newProf.setEmail(profesor[0]["email"]);
            newProf.setHorasGuardais(profesor[0]["horasGuardias"]);
            newProf.setDiaGuardia(profesor[0]["diaGuardia"]);
            newProf.setRole(profesor[0]["role"]);
            newProf.setValidate(profesor[0]["validate"]);
            newProf.setIdField(profesor[0]["idFIeld"]);
            if(newProf.getPassword() == "IESinfanta23" && newProf.getValidate() == 0){
              this.changepassword = true;
              this.nombreProfesor = newProf.getName();
              this.idFieldProfesor = newProf.getIdField();
              this.toastr.info("Para continuar debe configurar ahora su nueva contraseña","Cambio de contraseña",{timeOut:5000,closeButton:true,positionClass:"toast-bottom-center"})
              return;
            }else{
                        sessionStorage.setItem('profesor', JSON.stringify(newProf))
                        this.router.navigate(['/pagina/calendario']);
                        this.toastr.success("Bienvenido " + newProf.getName(),"Inicio de sesión correcto",{timeOut:3000,closeButton:true,positionClass:"toast-top-right",})
            }
          }else{
             // var mensaje = "Los datos de ingreso no coinciden"
             // const mensajeError = document.getElementById('mensajeErrorLogin');
             // mensajeError!.textContent = mensaje;
             if(password == "IESinfanta23"){
  
             }else{
               
               this.toastr.error("Los datos introducidos no coindicen con ninguna cuenta","Datos incorrectos",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})
            }
  
          }
        }); 
      }else{
    this.toastr.error("El campo correo tiene un formato incorrecto","Datos incorrectos",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})

      }

    }
  }


   onNewUser(){
    var regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    let newPassword = this.formNewUser.controls["newPassword"].value;
    let repeatPassword = this.formNewUser.controls["repeatPassword"].value;
    if(newPassword != repeatPassword){
     // var mensaje = "Las contraseñas no coinciden"
      //const mensajeError = document.getElementById('mensajeErrorNewUser');
     // mensajeError!.textContent = mensaje;
     this.toastr.error("Las contraseñas deben ser iguales","Datos incorrectos",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})

    }else{
      if(regexPassword.test(newPassword)){
        var passwordCodified = window.btoa(newPassword);
        this.profesorService.updateUserPassword(this.idFieldProfesor,passwordCodified);
        this.changepassword = false;
        this.formLogin.controls['password'].setValue(newPassword);
        this.toastr.success("Ya puede acceder con su nueva contraseña","Cambio de contraseña completado",{timeOut:3000,closeButton:true,positionClass:"toast-top-right",})


      }else{
     this.toastr.error("La contraseña debe contener minimo 6 caracteres, y almenos una mayuscula, una minuscula y un numero","Contraseña invalida",{timeOut:10000,closeButton:true,positionClass:"toast-bottom-center"})
      }
    }
    
  }

  }
      
      
     // const response = await this.profesorService.addProfesor(profesor);
     // const response = await this.profesorService.getProfesors().subscribe(profesores =>{
     // });
      // const response = await this.profesorService.addProfesor(profesor); 
