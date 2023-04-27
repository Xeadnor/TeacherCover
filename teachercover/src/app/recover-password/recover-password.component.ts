import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageClient } from "cloudmailin"
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  codigoPass: boolean;
  formLogin: FormGroup;
  formNewUser: FormGroup;
  constructor(private profesorService: ProfesorService, private router: Router, private toastr: ToastrService,private auth: AuthService) {};

  ngOnInit(): void {



    this.codigoPass = false;
    if(sessionStorage.length > 0){
      this.router.navigate(['/pagina/calendario']);
  }else{
    this.formLogin = new FormGroup({
      emailRP: new FormControl("",Validators.required)
    }, {updateOn: "submit"})
  }
}


 async crearCode(){
  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  let email = this.formLogin.controls["emailRP"].value;
  let idField : String;
  if(email.length > 0){
    if(regex.test(email)){

      let prueba = this.profesorService.confirmEmail();
      (await prueba).forEach(doc => {
        if(doc.data()["email"] == email){
          // send email
          this.auth.sendResetPassword(email)
          this.router.navigate(['']);
          this.toastr.success("Compruebe su correo electronico para reestablecer su contraseña","Codigo enviado",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})
        }
    })



      
    }else{
    this.toastr.error("El campo correo tiene un formato incorrecto","Datos incorrectos",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})

    }
  }else{
    this.toastr.error("El campo correo electronico es obligatorio","Datos incorrectos",{timeOut:3000,closeButton:true,positionClass:"toast-bottom-center"})

  }
}
  
}
