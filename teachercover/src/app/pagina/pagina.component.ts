import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from '../models/profesor.model';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  constructor( private router: Router) {};

  rolAdmin: boolean
  horasGuardias = "";
  diaGuardia = "----";
  nombreUsuario = "";
  rol = "";
  mostrarDatos : boolean

  ngOnInit(): void {
    if(sessionStorage.length == 0){
      this.router.navigate(['']);
    }else{
      let userJson = sessionStorage.getItem('profesor');
      let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
      this.horasGuardias = profesor["horasGuardias"]
      this.rol = profesor["role"]
      this.diaGuardia = profesor["diaGuardia"]
      this.nombreUsuario = profesor["name"]
      this.mostrarDatos = true;
      if(profesor["role"] == "User"){
        this.rolAdmin = false;
      }else{
        this.rolAdmin = true;
      }
    const divlog = document.getElementById("divLog");
    divlog!.classList.remove("d-none")
    const nombreUser = document.getElementById('nombreUser');
    nombreUser!.textContent = profesor["name"];

    }
  }

  hideDatos(){
    this.mostrarDatos = false;
  }

  showDatos(){
    this.mostrarDatos = true;
  }

}
