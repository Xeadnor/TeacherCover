import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from '../interfaces/profesor.interface';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  constructor( private router: Router) {};

  horasGuardias = "";
  diaGuardia = "----";
  nombreUsuario = "";

  ngOnInit(): void {
    if(sessionStorage.length == 0){
      this.router.navigate(['']);
    }else{
      let userJson = sessionStorage.getItem('profesor');
      let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
      this.horasGuardias = profesor["horasGuardias"]
      this.diaGuardia = profesor["diaGuardia"]
      this.nombreUsuario = profesor["name"]
    // console.log(profesor["name"]);
    const divlog = document.getElementById("divLog");
    divlog!.classList.remove("d-none")
    const nombreUser = document.getElementById('nombreUser');
    nombreUser!.textContent = profesor["name"];

    }
  }

}
