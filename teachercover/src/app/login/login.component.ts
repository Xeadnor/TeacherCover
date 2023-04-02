import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      name: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    }, {updateOn: "submit"})
      
  }

  onSubmit(){
    if(this.formLogin.controls["name"].value.length > 1 && this.formLogin.controls["password"].value.length > 1){
      console.log("intento de login")
        //comprobar base de datos
    }else{
      console.log("ha estao mal el login")
    }
  }

  }