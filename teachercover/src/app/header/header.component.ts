import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private router: Router) {};


  logout(){
    this.router.navigate(['']);
    const divlog = document.getElementById("divLog");
    divlog!.classList.add("d-none")

  }

  mostrarNombre(nombre: string){
    const divlog = document.getElementById("divLog");
    divlog!.classList.remove("d-none")
    const nombreUser = document.getElementById('nombreUser');
    nombreUser!.textContent = nombre;
  }
}
