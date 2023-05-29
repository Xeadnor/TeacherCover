import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../models/profesor.model';
import { Guardia } from '../models/guardia.model';
import { ProfesorService } from 'app/services/profesor.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  constructor( private router: Router,private route: ActivatedRoute, private profesorService: ProfesorService) {};

  rolAdmin: boolean
  horasGuardias = 0;
  diaGuardia = "----";
  nombreUsuario = "";
  rol = "";
  mostrarDatos : boolean

  async ngOnInit(): Promise<void> {
    if(sessionStorage.length == 0){
      this.router.navigate(['']);
    }else{
      let userJson = sessionStorage.getItem('profesor');
      let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
      this.rol = profesor["role"]
      this.diaGuardia = profesor["diaGuardia"]
      this.nombreUsuario = profesor["name"]

      this.mostrarDatos = true;
      const prueba = (await this.profesorService.getDataFromEmail(profesor["email"])).subscribe(profesor =>{
        this.horasGuardias = profesor[0]["horasGuardias"];
     
      });
    
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
