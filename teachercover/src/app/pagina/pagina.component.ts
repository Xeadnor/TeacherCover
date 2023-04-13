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
  diaGuardia = "";
  nombreUsuario = "";

  ngOnInit(): void {
    if(localStorage.length == 0){
      this.router.navigate(['']);
    }
    let userJson = localStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.horasGuardias = profesor["horasGuardias"]
    this.diaGuardia = profesor["diaGuardia"]
    this.nombreUsuario = profesor["name"]
  }

}
